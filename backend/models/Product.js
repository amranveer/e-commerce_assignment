import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [{ type: String, required: true }], // Array of image URLs
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    isNew: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    description: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
