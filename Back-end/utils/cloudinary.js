import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import 'dotenv/config';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    console.log("uploading...");

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error(`Error during file upload:`, error);

    return null;
  }
};

export { uploadOnCloudinary };
