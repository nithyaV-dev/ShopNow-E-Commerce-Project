import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export async function getCart(req, res) {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.json({ cart: cart || { items: [] } });
}

export async function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);

  if (!product) return res.status(404).json({ message: "Product not found." });
  if (product.stock < quantity) return res.status(400).json({ message: "Not enough stock." });

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const existing = cart.items.find((i) => i.product.toString() === productId);

  if (existing) {
    const newQty = existing.quantity + Number(quantity);
    if (newQty > product.stock) return res.status(400).json({ message: "Not enough stock." });
    existing.quantity = newQty;
  } else {
    cart.items.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: Number(quantity)
    });
  }

  await cart.save();
  await cart.populate("items.product");
  res.json({ cart });
}

export async function updateCartItem(req, res) {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found." });

  const item = cart.items.id(req.params.itemId);
  if (!item) return res.status(404).json({ message: "Cart item not found." });

  const product = await Product.findById(item.product);
  if (!product || quantity < 1 || quantity > product.stock) {
    return res.status(400).json({ message: "Invalid quantity." });
  }

  item.quantity = quantity;
  await cart.save();
  await cart.populate("items.product");
  res.json({ cart });
}

export async function removeCartItem(req, res) {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found." });

  cart.items = cart.items.filter((i) => i._id.toString() !== req.params.itemId);
  await cart.save();
  await cart.populate("items.product");
  res.json({ cart });
}

export async function clearCart(req, res) {
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] }, { upsert: true });
  res.json({ message: "Cart cleared." });
}
