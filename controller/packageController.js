import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';
import Package from '../models/pacakageModel.js';

export const getAllPackages = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Package.find(), req.query)
    .filter()
    .search()
    .sort()
    .paginate();

  const pkgs = await features.query;

  const total = await Package.countDocuments({
    ...features.filterConditions
  });

  const limit = req.query.limit * 1 || 100;
  const page = req.query.pag * 1 || 1;
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    status: "Success",
    results: pkgs.length,
    total,
    page,
    totalPages,
    data: pkgs
  });
});

export const getPackage = catchAsync(async (req, res, next) => {
  const pkg = await Package.findById(req.params.id);

  if (!pkg) {
    return next(new AppError("No package found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      pkg
    }
  });
});

export const createPackage = catchAsync(async (req, res, next) => {
  const pkg = await Package.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      pkg
    }
  });
});

export const createManyPackages = catchAsync(async (req, res, next) => {
  const packagesData = req.body.packages;

  const createdPackages = await Package.insertMany(packagesData);

  res.status(201).json({
    status: "success",
    results: createdPackages.length,
    data: createdPackages
  });
});

export const updatePackage = catchAsync(async (req, res, next) => {
  const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!pkg) {
    return next(new AppError("No package found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      pkg
    },
    message: "Succesfully Updated"
  });
});

export const deletePackage = catchAsync(async (req, res, next) => {
  const pkg = await Package.findByIdAndDelete(req.params.id);

  if (!pkg) {
    return next(new AppError("No package found with that ID", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
    message: "Deleted Succesfuly"
  });
});
