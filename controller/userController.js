import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import User from '../models/userModel.js';



const filterObj = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "Success",
    results: users.length,
    data: users
  });
});

export const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!["employee", "admin"].includes(req.body.role)) {
    return next(new AppError("you are not authorized", 401));
  }

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  res.status(200).json({
    status: "Success",
    data: user,
    message: "User created sucessfully"
  });
});

export const createManyUsers = catchAsync(async (req, res, next) => {
  const usersData = req.body.users;
  const createdUsers = await Promise.all(
    usersData.map((userData) => User.create(userData))
  );

  res.status(201).json({
    status: "success",
    results: createdUsers.length,
    data: createdUsers
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.role && !["employee", "admin"].includes(req.body.role)) {
    return next(new AppError("Invalid role", 400));
  }

  const filterBody = filterObj(req.body, "name", "email", "role", "active");

  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true
  });

  if (!updatedUser) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      user: updateUser
    },
    message: "updated sucessfully"
  });
});
