import FAQ from "./../models/FaqModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

export const getAllFaqs = catchAsync(async (req, res, next) => {
  const faq = await FAQ.find().sort("-createdAt");

  sendResponse(res, 200, faq, undefined, {
        total: faq.length,
  })
});

export const createFaq = catchAsync(async (req, res, next) => {
  const faq = await FAQ.create(req.body);

 sendResponse(res, 201, faq, 'FAQ created successfully')
});

export const updateFaq = catchAsync(async (req, res, next) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true
  });

  if (!faq) {
    return next(new AppError("No FAQ found with that ID", 404));
  }

sendResponse(res, 200, faq, 'FAQ updated successfully')
});

export const deleteFaq = catchAsync(async (req, res, next) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);

  if (!faq) {
    return next(new AppError("No FAQ found with that ID", 404));
  }

  sendResponse(res, 204, null, 'FAQ deleted successfully')
});
