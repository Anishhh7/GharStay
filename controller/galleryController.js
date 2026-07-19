import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import APIFeatures from './../utils/apiFeatures.js';
import Gallery from './../models/galleryModel.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';
import sendResponse from '../utils/sendResponse.js';

export const getAllGalleryItem = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Gallery.find(), req.query)
    .filter()
    .search()
    .sort()
    .pagination();
  const gallery = await features.query;
  const total = await Gallery.countDocuments(features.filterConditions);
  const totalPages = Math.ceil(total / features.limit);

  sendResponse(res, 200, gallery, undefined, {
    results: gallery.length,
    total,
    page: features.page,
    totalPages,
  });
});

export const getGalleryItem = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    return next(new AppError('No Gallery found with that ID', 404));
  }

  sendResponse(res, 200, gallery);
});

export const createGalleryItem = catchAsync(async (req, res, next) => {
  const url = req.file
    ? await uploadToCloudinary(req.file.buffer, 'gharstay/gallery')
    : undefined;

  const gallery = await Gallery.create({ ...req.body, url });

  sendResponse(res, 201, gallery, 'Gallery created successfully');
});

export const updateGalleryItems = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!gallery) {
    return next(new AppError('No Gallery found with that Id', 404));
  }

  sendResponse(res, 200, gallery, 'Gallery updated successfully');
});

export const deleteGalleryItem = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findByIdAndDelete(req.params.id);

  if (!gallery) {
    return next(new AppError('No Gallery found with that Id', 404));
  }

  sendResponse(res, 204, null, 'Gallery deleted successfully');
});
