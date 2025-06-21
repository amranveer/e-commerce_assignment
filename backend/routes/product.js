import express from "express";
import upload from "../middleware/upload.js";


import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/" ,upload.array("images", 6), createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
