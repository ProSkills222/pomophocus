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

router.post(
  "/updateTaskDescription",
  sessionControllers.valid,
  taskControllers.updateTaskDescription
);

router.post(
  "/updateTaskEstPomos",
  sessionControllers.valid,
  taskControllers.updateTaskEstPomos
);

router.post(
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
