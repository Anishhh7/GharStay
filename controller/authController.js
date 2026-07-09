const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require('./../models/userModel');
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const morgan = require("morgan");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppError("Incorrect emal and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkCorrectPassword(password, user.password))) {
    return next(new AppError("Incorrect email id and password", 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token=req.headers.authorization.split(" ")[1];
  }
  if (!token || token === "null") {
    return next(
      new AppError("You are not logged in.Please login and try again", 401)
    );
    }
next();
});
