import Blog from '../models/blogModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import sendResponse from '../utils/sendResponse.js';

export const getAllBlogs = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Blog.find(), req.query)
    .filter()
    .search()
    .sort()
    .pagination();

  const blog = await features.query;

  const total = await Blog.countDocuments(features.filterConditions);
  const totalPages = Math.ceil(total / features.limit);

  sendResponse(res, 200, blog, undefined, {
    results: blog.length,
    total,
    page: features.page,
    totalPages,
  });
});

export const getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  sendResponse(res, 200, blog);
});

export const createBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.create(req.body);

  sendResponse(res, 201, blog, 'Succesfully created a blog');
});

export const updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!blog) {
    return next(new AppError('Unable to find ', 404));
  }

  sendResponse(res, 200, blog, 'updated successfully');
});

export const deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    return next(new AppError('Unable to find', 404));
  }

  sendResponse(res, 204, null, 'Deleted successfully');
});
