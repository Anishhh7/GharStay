import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';
import Room from '../models/roomModel.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';
import sendResponse from '../utils/sendResponse.js';

export const getAllRooms = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Room.find(), req.query)
    .filter()
    .search()
    .sort()
    .pagination();

  const rooms = await features.query;

  const total = await Room.countDocuments(features.filterConditions);
  const totalPages = Math.ceil(total / features.limit);

  sendResponse(res, 200, rooms, undefined, {
    results: rooms.length,
    total,
    page: features.page,
    totalPages,
  });
});

export const getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new AppError('No room found with that ID', 404));
  }

  sendResponse(res, 200, room);
});

export const createRoom = catchAsync(async (req, res, next) => {
  const images =
    req.files && req.files.length > 0
      ? await Promise.all(
          req.files.map((file) =>
            uploadToCloudinary(file.buffer, 'gharstay/rooms')
          )
        )
      : [];

  const room = await Room.create({ ...req.body, images: images });

  sendResponse(res, 201, room, 'Room created successfully');
});

export const updateRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!room) {
    return next(new AppError('No room found with that ID', 404));
  }

  sendResponse(res, 200, 'Room updated succesfully', room);
});

export const deleteRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndDelete(req.params.id);

  if (!room) {
    return next(new AppError('No room found with that ID', 404));
  }

  sendResponse(res, 204, 'Room deleted Succesfully', null);
});
