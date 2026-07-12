import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';
import Room from '../models/roomModel.js';

export const getAllRooms = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Room.find(), req.query)
        .filter()
        .search()
        .sort()
        .pagination()

  const rooms = await features.query;
  
  const total = await Room.countDocuments(features.filterConditions);
  const totalPages = Math.ceil(total / features.limit);


  res.status(200).json({
    status: "Success",
    results: rooms.length,
    total,
    page:features.page,
    totalPages,
    data: rooms
  });
});

export const getRoom = catchAsync(async (req, res, next) => {
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

export const createRoom = catchAsync(async (req, res, next) => {
  const room = await Room.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      room
    }
  });
});

export const updateRoom = catchAsync(async (req, res, next) => {
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

export const deleteRoom = catchAsync(async (req, res, next) => {
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
