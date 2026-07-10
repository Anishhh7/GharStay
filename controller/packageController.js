const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Package = require("./../models/pacakageModel");

exports.getAllPackages = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Package.find(), req.query)
    .filter()
    .search()
    .sort()
    .paginate();

  const packages = await features.query;

  const total = await Package.countDocuments({
    ...features.filterConditions
  });

  const limit = req.query.limit * 1 || 100;
  const page = req.query.pag * 1 || 1;
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    status: "Success",
    results: packages.length,
    total,
    page,
    totalPages,
    data: packages
  });
});

exports.getPackage = catchAsync(async (req, res, next) => {
  const package = await Package.findById(req.params.id);

  if (!package) {
    return next(new AppError("No package found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      package
    }
  });
});

exports.createPackage = catchAsync(async (req, res, next) => {
  const package = await Package.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      package
    }
  });
});

exports.createManyPackages = catchAsync(async (req, res, next) => {
  const packagesData = req.body.packages;

  const createdPackages = await Package.insertMany(packagesData);

  res.status(201).json({
    status: "success",
    results: createdPackages.length,
    data: createdPackages
  });
});

exports.updatePackage = catchAsync(async (req, res, next) => {
  const package = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!package) {
    return next(new AppError("No package found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      package
    },
    message: "Succesfully Updated"
  });
});

exports.deletePackage = catchAsync(async (req, res, next) => {
  const package = await Package.findByIdAndDelete(req.params.id);

  if (!package) {
    return next(new AppError("No package found with that ID", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
    message: "Deleted Succesfuly"
  });
});
