import { v2 as cloudinary } from "cloudinary";
import envHelper from "../utils/envHelper";

cloudinary.config({
  cloud_name: envHelper("CLOUDINARY_NAME"),
  api_key: envHelper("CLOUDINARY_KEY"),
  api_secret: envHelper("CLOUDINARY_SECRET"),
});

export const handleCloudinaryUpload = async (file: string) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "C-ISPO",
  });
  return res;
};

export const handleCloudinaryDelete = async (publicId: string) => {
  const res = await cloudinary.uploader.destroy(publicId, { invalidate: true });
  return res;
};

export default cloudinary;
