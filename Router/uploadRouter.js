import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import upload from '../utils/mediaUpload.js'; // Your Multer memoryStorage instance

const router = express.Router();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Helper function to stream Multer buffer directly to Cloudinary
const uploadToCloudinary = (fileBuffer, folder = 'gharstay') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

// 3. Upload Route Handler
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'fail',
        message: 'No file provided or invalid form field name (must be "file").',
      });
    }
    const result = await uploadToCloudinary(req.file.buffer);

    return res.status(200).json({
      status: 'success',
      url: result.secure_url,
      data: {
        url: result.secure_url,
      },
    });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to upload image to cloud storage.',
      error: error.message,
    });
  }
});

export default router;