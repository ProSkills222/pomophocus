const dbo = require("../db/config");
const db = dbo.getDb();
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const allUsers = await db.collection("users").find({}).toArray();
  return res.send(allUsers);
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // should handle in frontend
  if (!username || !password) {
    return res.status(401).send({ message: "Missing username or password" });
  }

  const user = await db.collection("users").findOne({ username: username });
  if (!user) {
    return res.status(404).send({ message: "Username not found" });
  }

  const isPassValid = await bcrypt.compare(password, user.password);

  if (!isPassValid) {
    return res.status(401).send({ message: "Invalid username or password" });
  }

  req.session.user = { username: user.username, name: user.name, id: user._id };
  req.session.isAuthenticated = true;
  return res.status(200).send({ message: "Logged in successfully!" });
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Failed to logout" });
    }
    return res.status(200).send({ message: "Successfully logged out!" });
  });
};

const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const name = req.body.name;

  if (!username || !password || !confirmPassword || !name) {
    return res.status(401).send({ message: "Missing username or password" });
  }

  if (password !== confirmPassword) {
    return res
      .status(401)
      .send({ message: "The password confirmation does not match" });
  }

  const user = await db.collection("users").findOne({ username: username });

  if (user) {
    return res.status(409).send({ message: "Username already existed!" });
  }

  const newUser = {
    name: name,
    tasks: [],
    username: username,
    password: await bcrypt.hash(password, 10),
  };

  await db.collection("users").insertOne(newUser);

  return res.send({ message: "Successfully register new account" });
};

// const createTest = async (req, res) => {
//   const user1 = {
//     Name: "Phuoc",
//     tasks: [],
//     username: "phuocnguyen123",
//     password: "12345678",
//   };
//   const user2 = {
//     Name: "Hai",
//     tasks: [],
//     username: "haibui4real",
//     password: "12345678",
//   };

//   user1.password = await bcrypt.hash(user1.password, 10);
//   user2.password = await bcrypt.hash(user2.password, 10);

//   await db.collection("users").insertMany([user1, user2]);

//   res.send({ user1, user2 });
// };

module.exports = {
  getAllUsers,
  login,
  logout,
  register,
};
