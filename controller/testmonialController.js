import Testimonial from '../models/testimonialsModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import sendResponse from '../utils/sendResponse.js';

export const getAllTestimonials = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.find().sort('-createdAt');

  sendResponse(res, 200, testimonial, undefined, {
    results: testimonial.length,
  });
});

export const getActiveTestimonials = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.find({ approved: true }).sort(
    '-createdAt'
  );

  sendResponse(res, 200, testimonial, undefined, {
    results: testimonial.length,
  });
});

export const createTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.create(req.body);

  sendResponse(res, 201, testimonial, 'Testimonial created successfully.');
});

export const updateTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
  if (!testimonial) {
    return next(new AppError('No testimonial found with that ID', 404));
  }

  sendResponse(res, 200, testimonial, 'Testimonial updated successfully');
});

export const deleteTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

  if (!testimonial) {
    return next(new AppError('No testimonial found with that ID', 404));
  }

  sendResponse(res, 204, null, 'Testimonial deleted successfully');
});
