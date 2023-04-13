const session = require("express-session");
require("dotenv").config();

const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: process.env.ATLAS_URI,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log("Error connection to sessions db");
  console.log(error);
});

const sessionMiddleware = session({
  secret: "mySecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
  store: store,
});

const valid = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  return res.status(403).send({ message: "No permissions!" });
};

module.exports = { sessionMiddleware, valid };
