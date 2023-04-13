const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

app.listen(5000);
