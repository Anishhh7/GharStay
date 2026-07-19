import Contact from "../models/contactModel.js";
import sendResponse from "../utils/sendResponse.js";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res, next) => {
  const contact = await Contact.find().sort("-createdAt");

  sendResponse(res, 200, contact, undefined, {
   results: contact.length,
})
});

export const createContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.create(req.body);

sendResponse(res, 200, contact)
});

export const deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    return next(new AppError("No inquiry found with that ID", 404));
  }

 sendResponse(res, 204, null, 'Contact deleted successfully')
});
