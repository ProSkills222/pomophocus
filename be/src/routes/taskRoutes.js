const express = require("express");
const sessionControllers = require("../controllers/sessionControllers");
const taskControllers = require("../controllers/taskControllers");

const router = express.Router();

router.use(sessionControllers.sessionMiddleware);

router.post(
  "/createTask",
  sessionControllers.valid,
  taskControllers.createTask
);

router.get("/getTask", sessionControllers.valid, taskControllers.getTask);

router.put(
  "/updateTaskDescription",
  sessionControllers.valid,
  taskControllers.updateTaskDescription
);

router.put(
  "/updateTaskEstPomos",
  sessionControllers.valid,
  taskControllers.updateTaskEstPomos
);

router.put(
  "/updateTaskCurrPomos",
  sessionControllers.valid,
  taskControllers.updateTaskCurrPomos
);

router.delete(
  "/deleteTask",
  sessionControllers.valid,
  taskControllers.deleteTask
);

module.exports = router;
