import multer from "multer";
import { storage } from "../config/cloudinary.js";

const upload = multer({ storage }); // Automatically uploads to Cloudinary

export default upload;
