import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";

dotenv.config();
const app = express();
app.use(cors(
  {
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }
));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`));
});
