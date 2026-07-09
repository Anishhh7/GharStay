const express = require("express");
const morgan = require("morgan");
const userRouter = require("./Router/userRouter");

const app = express();
app.set("query parser", "extended");

app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use("./api/v1/users", userRouter);

module.exports = app;
