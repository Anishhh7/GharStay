import Blog from "../models/blogModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllBlogs = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Blog.find(), req.query)
    .filter()
    .search()
    .sort()
    .pagination()

  const blog = await features.query;

    const total = await Blog.countDocuments(features.filterConditions) 
  const totalPages = Math.ceil(total / features.limit);

  res.status(200).json({
    status: "Success",
    results: blog.length,
    total,
    totalPages,
    // page: features.page,
    data: blog
  });
});

export const getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    data: blog
  });
});

export const createBlog = catchAsync(async (req, res, next) => {
    const blog = await Blog.create(req.body)
    
    res.status(201).json({
        status: 'Success',
        data: blog,
        message:'Successfully Added'
    })
})

export const updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!blog) {
    return next(new AppError("Unable to find ", 404));
  }

  res.status(201).json({
    status: "Success",
    data: blog,
    message: "Update Sucessfully"
  });
});

export const deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    return next(new AppError("Unable to find", 404));
  }

  res.status(204).json({
    status: "Success",
    message: "Deleted Successfully",
    data: null
  });
});
