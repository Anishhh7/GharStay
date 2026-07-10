const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Menu = require("./../models/menuModel");
const { menu } = require("../Config/permission");

exports.getAllMenu = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Menu.find(), req.query)
    .filter()
    .search()
    .sort()
    .paginate();

  const menu = await features.query;

  const total = await Menu.countDocuments({
    ...features.filterConditions
  });

  const limit = req.query.limit * 1 || 100;
  const page = req.query.pag * 1 || 1;
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    status: "Success",
    results: menu.length,
    total,
    page,
    totalPages,
    data: menu
  });
});

exports.getMenu = catchAsync(async (req, res, next) => {
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

exports.createMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      menu
    }
  });
});

exports.createManyMenu = catchAsync(async (req, res, next) => {
  const menuData = req.body.menu;

  const createdMenu = await Menu.insertMany(menuData);

  res.status(201).json({
    status: "success",
    results: createdMenu.length,
    data: createdMenu
  });
});

exports.updateMenu = catchAsync(async (req, res, next) => {
  const menu = await menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
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

exports.deleteMenu= catchAsync(async (req, res, next) => {
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
