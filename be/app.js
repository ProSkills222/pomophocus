const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", taskRoutes);

app.listen(5000);
