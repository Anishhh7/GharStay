import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';
import Menu from './../models/menuModel.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';
import sendResponse from '../utils/sendResponse.js';

export const getAllMenu = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Menu.find(), req.query)
    .filter()
    .search()
    .sort()
    .pagination();

  const menu = await features.query;

  const total = await Menu.countDocuments(features.filterConditions);

  const totalPages = Math.ceil(total / features.limit);

  sendResponse(res, 200, menu, undefined, {
    results: menu.length,
    total,
    page: features.page,
    totalPages,
  });
});

export const getMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) {
    return next(new AppError('No menu found with that ID', 404));
  }

  sendResponse(res, 200, menu);
});

export const createMenu = catchAsync(async (req, res, next) => {
  const image = req.body
    ? await uploadToCloudinary(req.file.buffer, 'gharstay/menu')
    : undefined;

  const menu = await Menu.create({ ...req.body, images: image });

  sendResponse(res, 201, menu, 'Menu created successfully');
});

export const updateMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!menu) {
    return next(new AppError('No menu found with that ID', 404));
  }

  sendResponse(res, 200, menu, 'Menu updated successfully');
});

export const deleteMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.findByIdAndDelete(req.params.id);

  if (!menu) {
    return next(new AppError('No menu found with that ID', 404));
  }

  sendResponse(res, 204, null, 'Menu deleted successfully');
});
