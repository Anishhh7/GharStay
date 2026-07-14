import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import Events from "../models/eventsModel.js";

export const getAllEvents = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Events.find(), req.query)
    .filter()
    .search()
    .sort()
    .pagination();

  const event = await features.query;

  const total = await Events.countDocuments(features.filterConditions);
  const totalPages = Math.ceil(total / features.limit);

  res.status(200).json({
    status: "Success",
    results: event.length,
    total,
    page: features.page,
    totalPages,

    data: event
  });
});

export const getEvent = catchAsync(async (req, res, next) => {
  const event = await Events.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    data: event
  });
});

export const createEvent = catchAsync(async (req, res, next) => {
  const event = await Events.create(req.body);

  res.status(201).json({
    status: "Success",
    data: event,
    message: "Created Sucessfully"
  });
});

export const updateEvent = catchAsync(async (req, res, next) => {
  const event = await Events.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true
  });

  if (!event) {
    return next(new AppError("Unable to find", 404));
  }

  res.status(201).json({
    status: "Success",
    data: event,
    message: "Updated Successfully"
  });
});

export const deleteEvents = catchAsync(async (req, res, next) => {
  const event = await Events.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(new AppError("Unable to find", 404));
  }

  res.status(204).json({
    status: "Success",
    message: "Deleted Successfully",
    data: null
  });
});
