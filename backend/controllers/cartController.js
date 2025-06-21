import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.userId }).populate("products.productId");
  res.json(cart || { products: [] });
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart) {
    cart = new Cart({ userId: req.user.userId, products: [{ productId, quantity }] });
  } else {
    const existing = cart.products.find(p => p.productId.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  }

  await cart.save();
  res.status(201).json(cart);
};

export const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.userId });
  if (cart) {
    cart.products = cart.products.filter(p => p.productId.toString() !== req.params.id);
    await cart.save();
  }
  res.json(cart);
};
