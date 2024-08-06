import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_DATABASE_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_SECRET_KEY,
});

const uploadOnCloudnary = async (localfilePath) => {
  try {
    if (!localfilePath) return null;

    const uploadPath = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });

    console.log(uploadPath);

    return uploadPath;
  } catch (error) {
    //! clear file  form  temp  server
    fs.unlinkSync(localfilePath);
    return null;
  }
};

export {uploadOnCloudnary};