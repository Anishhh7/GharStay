const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const filterObj = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "Success",
    results: users.length,
    data: users
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!["employee", "admin"].includes(req.body.role)) {
    return next(new AppError("you are not authoeized", 401));
  }

  const user = new User({
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

exports.updateUser = catchAsync(async (req, res, next) => {
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
