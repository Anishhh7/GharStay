import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import Events from '../models/eventsModel.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';
import sendResponse from '../utils/sendResponse.js';

export const getAllEvents = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Events.find(), req.query)
    .filter()
    .search()
    .sort()
    .pagination();

  const event = await features.query;

  const total = await Events.countDocuments(features.filterConditions);
  const totalPages = Math.ceil(total / features.limit);

  sendResponse(res, 200, event, undefined, {
    results: event.length,
    total,
    page: features.page,
    totalPages,
  });
});

export const getEvent = catchAsync(async (req, res, next) => {
  const event = await Events.findById(req.params.id);

  sendResponse(res, 200, event)
});

export const createEvent = catchAsync(async (req, res, next) => {
  const image = await uploadToCloudinary(file.buffer, 'gharstay/events');

  const event = await Events.create({ ...req.body, images: image });

sendResponse(res, 201, event, "Event created successfully")
});

export const updateEvent = catchAsync(async (req, res, next) => {
  const event = await Events.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  sendResponse(res, 200, event,'Event updated successfully' )
});

export const deleteEvents = catchAsync(async (req, res, next) => {
  const event = await Events.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(new AppError('No Event found with that Id', 404));
  }

 sendResponse(res, 204, null, 'Event deleted successfully')
});
