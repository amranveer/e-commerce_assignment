import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  product ? res.json(product) : res.status(404).json({ error: "Not found" });
};


export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      originalPrice,
      isNew,
      description,
      category,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required." });
    }

    const imageUrls = req.files.map((file) => file.path); // Cloudinary provides .path

    const product = new Product({
      name,
      price,
      originalPrice,
      isNew,
      description,
      category,
      images: imageUrls,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
