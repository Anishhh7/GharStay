import cloudinary from '../Config/cloudinary.js'

const uploadToCloudinary = (fileBuffer, folderName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export default uploadToCloudinary;
