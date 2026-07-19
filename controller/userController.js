import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import User from '../models/userModel.js';
import sendResponse from '../utils/sendResponse.js';

const filterObj = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  sendResponse(res, 200, users, undefined, {
    results: users.length,
  });
});

export const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!['staff', 'admin'].includes(role)) {
    return next(new AppError('Permission denied', 401));
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendResponse(res, 201, user, 'User created sucessfully');
});

export const createManyUsers = catchAsync(async (req, res, next) => {
  const usersData = req.body.users;

  const invalidUser = usersData.find(
    (u) => !['staff', 'admin'].includes(u.role)
  );
  if (invalidUser) {
    return next(new AppError('Invalid role in one or more users', 400));
  }

  const manyUsers = await Promise.all(
    usersData.map((userData) =>
      User.create({
        name: userData.name,
        email: userDate.email,
        password: userData.password,
        role: userData.role,
      })
    )
  );

  sendResponse(res, 201, manyUsers, 'Bulk users created successfully');
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.role && !['employee', 'admin'].includes(req.body.role)) {
    return next(new AppError('Invalid role', 400));
  }

  const filterBody = filterObj(req.body, 'name', 'email', 'role', 'active');

  const updateUser = await User.findByIdAndUpdate(req.params.id, filterBody, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!updatedUser) {
    return next(new AppError('No user found with that ID', 404));
  }

  sendResponse(res, 200, updateUser, 'User updated successfully');
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  sendResponse(res, 204, null, 'User deleted successfully');
});
