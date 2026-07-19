import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';
import Package from '../models/pacakageModel.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';

export const getAllPackages = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Package.find(), req.query)
    .filter()
    .search()
    .sort()
    .pagination();

  const pkgs = await features.query;

  const total = await Package.countDocuments(features.filterConditions);

  const totalPages = Math.ceil(total / features.limit);

  res.status(200).json({
    status: 'Success',
    results: pkgs.length,
    total,
    page: features.page,
    totalPages,
    data: pkgs,
  });
});

export const getPackage = catchAsync(async (req, res, next) => {
  const pkg = await Package.findById(req.params.id);

  if (!pkg) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      pkg,
    },
  });
});

export const createPackage = catchAsync(async (req, res, next) => {
  const image =
    req.file && req.file.length > 0
      ? await uploadToCloudinary(file.buffer, 'gharstay/packages')
      : [];

  const pkg = await Package.create({ ...req.body, images: image });

  res.status(201).json({
    status: 'success',
    data: {
      pkg,
    },
  });
});

export const updatePackage = catchAsync(async (req, res, next) => {
  const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!pkg) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: {
      pkg,
    },
    message: 'Succesfully Updated',
  });
});

export const deletePackage = catchAsync(async (req, res, next) => {
  const pkg = await Package.findByIdAndDelete(req.params.id);

  if (!pkg) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(204).json({
    status: 'Success',
    data: null,
    message: 'Deleted Succesfuly',
  });
});
