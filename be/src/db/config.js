const { MongoClient } = require("mongodb");
require("dotenv").config();
const client = new MongoClient(process.env.ATLAS_URI);

let dbConnection;

module.exports = {
  getDb: function () {
    dbConnection = client.db("pomophocus");
    if (!dbConnection) {
      console.log("Cannot connect to database.");
      return;
    }
    console.log("Successfully connected to database");
    return dbConnection;
  },
};
