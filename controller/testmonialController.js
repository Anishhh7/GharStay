import Testimonial from "../models/testimonialsModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAllTestimonials = catchAsync(async (req, res, next) => {
 const testimonial = await Testimonial.find().sort("-createdAt");

 res.status(200).json({
  status: "Success",
  results: testimonial.length,
  data: testimonial
 });
});

export const getActiveTestimonials = catchAsync(async (req, res, next) => {
 const testimonial = await Testimonial.find({ approved: true }).sort("-createdAt");

 res.status(200).json({
  status: "Success",
  results: testimonial.length,
  data: testimonial
 });
});

export const createTestimonial = catchAsync(async (req, res, next) => {
 const testimonial = await Testimonial.create(req.body);

 res.status(200).json({
  status: "Success",
  data: testimonial,
  message: "Done"
 });
});

export const updateTestimonial = catchAsync(async (req, res, next) => {
 const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
  returnDocument: true,
  runValidators: true
 });
  if (!testimonial) {
    return next(new AppError('Unable to access', 404))
  }

  res.status(200).json({
    status: 'Success',
    data: testimonial,
    message:'Updated Successfully'
  })
  
});

export const deleteTestimonial = catchAsync(async (req, res, next) => {
 const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

 if (!testimonial) {
  return next(new AppError("Unable to find", 404));
 }

 res.status(204).json({
  status: "Success",
  data: null,
  message: "Deleted Successfully"
 });
});
