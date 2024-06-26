import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image"
    });
    fs.unlinkSync(localFilePath);  // Remove the file from the server after uploading
    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath);  // Remove the file even if there is an error
    throw error;
  }
};

export { uploadOnCloudinary };
