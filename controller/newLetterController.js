import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import News from '../models/newsLetterModel.js';

export const createSubscriber = catchAsync(async (req, res, next) => {
  const subscriber = await News.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: { subscriber },
    message: 'Subscribed sucessfully',
  });
});

export const getAllSubscribers = catchAsync(async (req, res, next) => {
  const subscriber = await News.find();

  res.status(200).json({
    status: 'Success',
    results: subscriber.length,
    data: { subscriber },
  });
});
