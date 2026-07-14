import FAQ from "./../models/FaqModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllFaqs = catchAsync(async (req, res, next) => {
  const faq = await FAQ.find().sort("-createdAt");

  res.status(200).json({
    status: "Success",
    total: faq.length,
    data: faq
  });
});

export const createFaq = catchAsync(async (req, res, next) => {
  const faq = await FAQ.create(req.body);

  res.status(201).json({
    status: "Success",
    data: faq,
    message: "Created Successfully"
  });
});

export const updateFaq = catchAsync(async (req, res, next) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true
  });

  if (!faq) {
    return next(new AppError("Unable to find", 404));
  }

  res.status(200).json({
    status: "Success",
    data: faq,
    message: "Updated Successfully"
  });
});

export const deleteFaq = catchAsync(async (req, res, next) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);

  if (!faq) {
    return next(new AppError("Unable to find", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
    message: "Deleted Successfully"
  });
});
