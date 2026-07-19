import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import News from '../models/newsLetterModel.js';
import sendResponse from '../utils/sendResponse.js';

export const createSubscriber = catchAsync(async (req, res, next) => {
  const subscriber = await News.create(req.body);

  sendResponse(res, 201, subscriber, 'Newsletter created successfully');
});

export const getAllSubscribers = catchAsync(async (req, res, next) => {
  const subscriber = await News.find();

  sendResponse(res, 201, subscriber, undefined, { results: subscriber.length });
});
