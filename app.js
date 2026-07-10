const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./controller/errorController");
const userRouter = require("./Router/userRouter");
const roomRouter = require("./Router/roomRouter");
const packageRouter = require('./Router/packageRouter');
const menuRouter= require('./Router/menuRouter')

const app = express();
app.set("query parser", "extended");

app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);
app.use('/api/v1/packages', packageRouter);
app.use('/api/v1/menu-item', menuRouter);

app.all('/{*path}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
