import Reservation from '../models/reservationModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/apiFeatures.js';
import Room from '../models/roomModel.js';
import sendEmail from '../utils/sendEmail.js';
import reservationAdminEmail from '../utils/emailTemplate/adminEmail.js';
import reservationCustomerEmail from '../utils/emailTemplate/customerEmail.js';

const filterObj = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const createReservation = catchAsync(async (req, res, next) => {
  const checkedRoom = await Room.findById(req.body.room);

  if (!checkedRoom) {
    return next(new AppError('Unable to find', 400));
  }

  if (!checkedRoom.availability) {
    return next(new AppError('this room is not available right now', 400));
  }
  if (new Date(req.body.checkedIn) < new Date()) {
    return next(new AppError('You cannot choose past Date', 400));
  }

  if (new Date(req.body.checkedIn) >= new Date(req.body.checkedOut)) {
    return next(new AppError('Please select a valid date', 400));
  }

  const reserveChecking = await Reservation.find({
    room: req.body.room,
    status: { $ne: 'Cancelled' },
    checkedIn: { $lt: req.body.checkedOut },
    checkedOut: { $gt: req.body.checkedIn },
  });

  if (reserveChecking.length > 0) {
    return next(
      new AppError(
        'Currently this room is not available. Please choose another room and try again',
        400
      )
    );
  }

  const reservation = await Reservation.create(req.body);

  await sendEmail(reservationCustomerEmail(reservation));
  await sendEmail(reservationAdminEmail(reservation));

  res.status(201).json({
    status: 'Success',
    data: reservation,
    message: 'Successfully Created Reservation',
  });
});

export const getAllReservations = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Reservation.find().populate('room'),
    req.query
  )
    .filter()
    .search()
    .sort()
    .pagination();

  const reservation = await features.query;

  const total = await Reservation.countDocuments(features.filterCondition);
  const totalPages = Math.ceil(total / features.limit);

  res.status(200).json({
    status: 'Success',
    results: {
      total,
      totalPages,
      page: reservation.length,
    },
    data: reservation,
  });
});

export const getReservation = catchAsync(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id).populate(
    'room'
  );

  if (!reservation) {
    return next(new AppError('Invalid Id', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: reservation,
  });
});

export const updateStatusReservation = catchAsync(async (req, res, next) => {
  if (
    req.body.status &&
    !['Pending', 'Approved', 'Completed', 'Cancelled'].includes(req.body.status)
  ) {
    return next(new AppError('Invalid status', 400));
  }

  const filterBody = filterObj(req.body, 'status', 'remarks');

  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    filterBody,
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );

  if (!reservation) {
    return next(new AppError('unable to find', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: reservation,
    message: 'Updated successfully',
  });
});

export const updateReservationDetails = catchAsync(async (req, res, next) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnDocument: 'after',
      runValidators: true,
    }
  ).populate('room');

  if (!reservation) {
    return next(new AppError('Unable to find', 404));
  }

  res.status(200).json({
    status: 'Success',
    data: reservation,
    message: 'updated successfully',
  });
});

export const deleteReservation = catchAsync(async (req, res, next) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);

  if (!reservation) {
    return next(new AppError('unable to find'), 404);
  }

  res.status(204).json({
    status: 'Success',
    data: null,
    message: 'Deleted successfully',
  });
});
