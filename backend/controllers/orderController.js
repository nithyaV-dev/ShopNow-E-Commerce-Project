import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export async function createOrder(req, res) {
  const { shippingAddress, paymentMethod = "COD" } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart || !cart.items.length) {
    return res.status(400).json({ message: "Your cart is empty." });
  }

  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.quantity) {
      return res.status(400).json({ message: `${item.name} is out of stock or has insufficient stock.` });
    }
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 1000 ? 0 : 80;
  const total = subtotal + shippingFee;

  const order = await Order.create({
    user: req.user._id,
    items: cart.items.map((i) => ({
      product: i.product,
      name: i.name,
      image: i.image,
      price: i.price,
      quantity: i.quantity
    })),
    shippingAddress,
    paymentMethod,
    paymentStatus: paymentMethod === "DEMO_ONLINE" ? "Paid" : "Pending",
    subtotal,
    shippingFee,
    total
  });

  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity }
    });
  }

  cart.items = [];
  await cart.save();

  res.status(201).json({ order });
}

export async function getMyOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ orders });
}

export async function getOrder(req, res) {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) return res.status(404).json({ message: "Order not found." });

  if (!req.user.isAdmin && order.user._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied." });
  }

  res.json({ order });
}

export async function getAllOrders(req, res) {
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json({ orders });
}

export async function updateOrderStatus(req, res) {
  const { status } = req.body;
  const allowed = ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid order status." });
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!order) return res.status(404).json({ message: "Order not found." });
  res.json({ order });
}
