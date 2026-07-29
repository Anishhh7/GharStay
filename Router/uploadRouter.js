
import express from 'express';
import upload from '../utils/mediaUpload.js'; 
const router = express.Router();


router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'fail', message: 'No file uploaded' });
  }

  const fileUrl = req.file.path || req.file.filename || req.file.secure_url;
  res.status(200).json({
    status: 'success',
      url: fileUrl,
    data: {
      url: fileUrl 
    }
  });
});

export default router;