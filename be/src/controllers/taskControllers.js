const ConnectMongoDBSession = require("connect-mongodb-session");
const dbo = require("../db/config");
const { ObjectId } = require("bson");
const db = dbo.getDb();

const createTask = async (req, res) => {
  const userId = new ObjectId(req.session.user.id);
  const description = req.body.description;
  const estPomos = req.body.estPomos;
  const currPomos = req.body.currPomos;

  const newTask = {
    user: userId,
    descritpion: description,
    estPomos: estPomos,
    currPomos: currPomos,
  };

  const result = await db.collection("tasks").insertOne(newTask);
  let insertedId = result.insertedId;

  const user = await db
    .collection("users")
    .updateOne({ _id: userId }, { $push: { tasks: new ObjectId(insertedId) } });

  return res.status(200).send({ message: "Successfully created tasks" });
};

const getTask = async (req, res) => {
  const userId = new ObjectId(req.session.user.id);

  const user = await db.collection("users").findOne({ _id: userId });
  const taskIds = user.tasks;

  const tasks = [];
  for (const taskId of taskIds) {
    tasks.push(await db.collection("tasks").findOne({ _id: taskId }));
  }

  return res.status(200).send(tasks);
};

const updateTaskDescription = async (req, res) => {
  const taskId = new ObjectId(req.body.taskId);
  const userId = new ObjectId(req.session.user.id);

  const description = req.body.description;
  const task = await db.collection("tasks").findOne({ _id: taskId });

  if (task.user.toString() !== userId.toString()) {
    return res.status(403).send({ message: "No permissions to modify!" });
  }

  await db
    .collection("tasks")
    .updateOne({ _id: taskId }, { $set: { description: description } });

  return res.status(200).send({
    message: "Update description successfully!",
  });
};

const updateTaskEstPomos = async (req, res) => {
  const taskId = new ObjectId(req.body.taskId);
  const userId = new ObjectId(req.session.user.id);

  const reqEstPomos = req.body.estPomos;

  const task = await db.collection("tasks").findOne({ _id: taskId });

  if (task.user.toString() !== userId.toString()) {
    return res.status(403).send({ message: "No permissions to modify!" });
  }

  let estPomos = task.currPomos;
  if (reqEstPomos > task.currPomos) {
    estPomos = reqEstPomos;
  }

  await db
    .collection("tasks")
    .updateOne({ _id: taskId }, { $set: { estPomos: estPomos } });

  return res.status(200).send({
    message: "Update estPomos successfully!",
  });
};

const updateTaskCurrPomos = async (req, res) => {
  const taskId = new ObjectId(req.body.taskId);
  const userId = new ObjectId(req.session.user.id);

  const reqCurrPomos = req.body.estPomos;

  const task = await db.collection("tasks").findOne({ _id: taskId });

  if (task.user.toString() !== userId.toString()) {
    return res.status(403).send({ message: "No permissions to modify!" });
  }

  const currPomosMax = task.estPomos;
  const currPomosMin = 0;

  if (reqCurrPomos > currPomosMax) {
    reqCurrPomos = currPomosMax;
  } else if (reqCurrPomos < currPomosMin) {
    reqCurrPomos = 0;
  }

  await db
    .collection("tasks")
    .updateOne({ _id: taskId }, { $set: { currPomos: currPomos } });

  return res.status(200).send({
    message: "Update currPomos successfully!",
  });
};

const deleteTask = async (req, res) => {
  const taskId = new ObjectId(req.body.taskId);
  const userId = new ObjectId(req.session.user.id);

  const task = await db.collection("tasks").findOne({ _id: taskId });

  if (task.user.toString() !== userId.toString()) {
    return res.status(403).send({ message: "No permissions to modify!" });
  }

  await db
    .collection("users")
    .updateOne({ _id: userId }, { $pull: { tasks: taskId } });

  await db.collection("tasks").deleteOne({ _id: taskId });

  return res.status(200).send({
    message: "Successfully deleted task!",
  });
};

module.exports = {
  createTask,
  getTask,
  updateTaskDescription,
  updateTaskEstPomos,
  updateTaskCurrPomos,
  deleteTask,
};
