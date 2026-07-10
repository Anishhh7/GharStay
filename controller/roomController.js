const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Room = require("../models/roomModel");

exports.getAllRooms = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Room.find(), req.query)
        .filter()
        .search()
        .sort()
        .paginate();

  const rooms = await features.query;

  const total = await Room.countDocuments({
    ...features.filterConditions
  });

  const limit = req.query.limit * 1 || 100;
  const page = req.query.pag * 1 || 1;
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    status: "Success",
    results: rooms.length,
    total,
    page,
    totalPages,
    data: rooms
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new AppError("No room found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      room
    }
  });
});

exports.createRoom = catchAsync(async (req, res, next) => {
  const room = await Room.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      room
    }
  });
});

exports.updateRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!room) {
    return next(new AppError("No room found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      room
    },
    message: "Succesfully Updated"
  });
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndDelete(req.params.id);

  if (!room) {
    return next(new AppError("No room found with that ID", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
    message: "Deleted Succesfuly"
  });
});
