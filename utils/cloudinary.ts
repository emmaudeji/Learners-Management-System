import { cloudinaryConfig } from "@/lib/actions/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecrete,
  secure: true,
});

export default cloudinary;
