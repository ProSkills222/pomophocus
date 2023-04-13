const express = require("express");
const userControllers = require("../controllers/userControllers");
const sessionControllers = require("../controllers/sessionControllers");
const router = express.Router();

router.use(sessionControllers.sessionMiddleware);

router.post("/register", userControllers.register);

router.post("/login", userControllers.login);

router.delete("/logout", userControllers.logout);

router.get("/users", sessionControllers.valid, userControllers.getAllUsers);

module.exports = router;
