import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';
import Menu from './../models/menuModel.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';


export const getAllMenu = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Menu.find(), req.query)
    .filter()
    .search()
    .sort()
    .pagination()

  const menu = await features.query;

  const total = await Menu.countDocuments(features.filterConditions);

  const totalPages = Math.ceil(total / features.limit);

  res.status(200).json({
    status: "Success",
    results: menu.length,
    total,
    page:features.page,
    totalPages,
    data: menu
  });
});

export const getMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) {
    return next(new AppError("No menu found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      menu
    }
  });
});

export const createMenu = catchAsync(async (req, res, next) => {
  const image = await uploadToCloudinary(file.buffer, 'gharstay/menu')
  
  const menu = await Menu.create({ ...req.body, images:image});

  res.status(201).json({
    status: "success",
    data: {
      menu
    }
  });
});


export const updateMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true
  });

  if (!menu) {
    return next(new AppError("No menu found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      menu
    },
    message: "Succesfully Updated"
  });
});

export const deleteMenu= catchAsync(async (req, res, next) => {
  const menu = await Menu.findByIdAndDelete(req.params.id);

  if (!menu) {
    return next(new AppError("No menu found with that ID", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
    message: "Deleted Succesfuly"
  });
});
