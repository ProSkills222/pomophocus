const express = require("express");
const sessionControllers = require("../controllers/sessionControllers");
const taskControllers = require("../controllers/taskControllers");

const router = express.Router();

router.use(sessionControllers.sessionMiddleware);
router.use(sessionControllers.valid);

router.post("/createTask", taskControllers.createTask);

router.get("/getTask", taskControllers.getTask);

router.post("/updateTaskDescription", taskControllers.updateTaskDescription);

router.post("/updateTaskEstPomos", taskControllers.updateTaskEstPomos);

router.post("/updateTaskCurrPomos", taskControllers.updateTaskCurrPomos);

router.delete("/deleteTask", taskControllers.deleteTask);

module.exports = router;
