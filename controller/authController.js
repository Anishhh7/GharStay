import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import catchAsync from './../utils/catchAsync.js';
import AppError  from './../utils/appError.js';
import morgan from 'morgan';
import User from './../models/userModel.js'

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

export const logIn = catchAsync(async (req, res, next) => {
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

export const protect = catchAsync(async (req, res, next) => {
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
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('This token is no longer available', 401));
  }

  if (currentUser.checkPasswordChanged(decoded.iat)) {
    return next(new AppError('User password has been recently changed. Please login again', 401))
  }
  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return(req, res, next)=> {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Permission Denied', 401))
    }
    next();
  }
}