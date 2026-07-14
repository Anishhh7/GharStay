import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";
import APIFeatures from "./../utils/apiFeatures.js";
import Gallery from "./../models/galleryModel.js";

export const getAllGalleryItem = catchAsync(async (req, res, next) => {
 const features = new APIFeatures(Gallery.find(), req.query)
  .filter()
  .search()
  .sort()
  .pagination();
 const gallery = await features.query;
 const total = await Gallery.countDocuments(features.filterConditions);
 const totalPages = Math.ceil(total / features.limit);

 res.status(201).json({
  status: "Success",
  results: gallery.length,
  total,
  page: features.page,
  totalPages,
  data: {
   gallery
  }
 });
});

export const getGalleryItem = catchAsync(async (req, res, next) => {
 const gallery = await Gallery.findById(req.params.id);

 if (!gallery) {
  return next(new AppError("No gallery found", 404));
 }

 res.status(200).json({
  status: "Success",
  data: gallery
 });
});

export const createGalleryItem = catchAsync(async (req, res, next) => {
 const gallery = await Gallery.create(req.body);

 res.status(201).json({
  status: "Success",
  data: gallery
 });
});

export const createManyGalleryItems = catchAsync(async (req, res, next) => {
 const gallery = req.body.gallery;

 const createGallery = await Gallery.insertMany(gallery);

 res.status(201).json({
  status: "success",
  results: createGallery.length,
  data: {
   createGallery
  }
 });
});

export const updateGalleryItems = catchAsync(async (req, res, next) => {
 const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
  returnDocument:"after",
  runValidators: true
 });

 if (!gallery) {
  return next(new AppError("Unable to find", 404));
 }

 res.status(200).json({
  status: "Success",
  data: gallery,
  message: "Updated successfully"
 });
});

export const deleteGalleryItem = catchAsync(async (req, res, next) => {
 const gallery = await Gallery.findByIdAndDelete(req.params.id);

 if (!gallery) {
  return next(new AppError("Unable to find", 404));
 }

 res.status(204).json({
  status: "Success",
  data: null,
  message: "Deleted successfully"
 });
});
