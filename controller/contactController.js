import Contact from "../models/contactModel.js";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res, next) => {
  const contact = await Contact.find().sort("-createdAt");

  res.status(200).json({
    status: "Success",
    results: contact.length,
    data: contact
  });
});

export const createContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      contact
    }
  });
});

export const deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    return next(new AppError("No inquiry found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null
  });
});
