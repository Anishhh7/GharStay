import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import UploadStream from '../utils/uploadToCloudinary.js';
import Website from '../models/websiteDesignModel.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';

export const getWebsite = catchAsync(async (req, res, next) => {
  const website = await Website.findOne();

  if (!website) {
    return next(new AppError('unable to find', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { website },
  });
});

export const updateWebsite = catchAsync(async (req, res, next) => {
  const updateData = { ...req.body };

  if (req.files?.logo) {
    updateData.logo = await uploadToCloudinary(
      req.file.logo[0].buffer,
      'gharstay/logo'
    );
  }

  if (req.files?.bannerImages) {
    updateData.bannerImages = await Promise.all(
      uploadToCloudinary(
        req.files.bannerImages.map(file.buffer, 'gharstay/bannerImages')
      )
    );
  }

  const website = await Website.findOneAndUpdate({}, updateData, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!website) {
    return next(new AppError('unable to find', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { website },
    message: 'updated successfully',
  });
});
