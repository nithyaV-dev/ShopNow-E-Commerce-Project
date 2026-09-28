import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

dotenv.config();
await connectDB();

const products = [
  {
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    description: "Comfortable wireless headphones with rich sound, deep bass and long battery life.",
    price: 2499,
    oldPrice: 3499,
    category: "Electronics",
    brand: "SoundMax",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    stock: 25,
    rating: 4.7,
    numReviews: 128
  },
  {
    name: "Smart Watch Pro",
    slug: "smart-watch-pro",
    description: "Modern smartwatch with fitness tracking, notifications and a bright display.",
    price: 3299,
    oldPrice: 4999,
    category: "Electronics",
    brand: "TimeTech",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    stock: 18,
    rating: 4.5,
    numReviews: 95
  },
  {
    name: "Classic Running Shoes",
    slug: "classic-running-shoes",
    description: "Lightweight running shoes designed for everyday comfort and training.",
    price: 1999,
    oldPrice: 2799,
    category: "Fashion",
    brand: "RunX",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    stock: 40,
    rating: 4.6,
    numReviews: 76
  },
  {
    name: "Minimal Backpack",
    slug: "minimal-backpack",
    description: "Clean everyday backpack with laptop compartment and water-resistant fabric.",
    price: 1299,
    oldPrice: 1799,
    category: "Fashion",
    brand: "UrbanCarry",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    stock: 35,
    rating: 4.4,
    numReviews: 61
  },
  {
    name: "Mechanical Keyboard",
    slug: "mechanical-keyboard",
    description: "Tactile mechanical keyboard for coding, gaming and productivity.",
    price: 2799,
    oldPrice: 3599,
    category: "Computers",
    brand: "KeyPro",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    stock: 22,
    rating: 4.8,
    numReviews: 143
  },
  {
    name: "Desk Lamp",
    slug: "desk-lamp",
    description: "Modern LED desk lamp with adjustable brightness for work and study.",
    price: 899,
    oldPrice: 1299,
    category: "Home",
    brand: "BrightHome",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    stock: 50,
    rating: 4.3,
    numReviews: 44
  }
];

await Product.deleteMany({});
await Product.insertMany(products);

const adminPassword = await bcrypt.hash("Admin@123", 10);
await User.findOneAndUpdate(
  { email: "admin@mernshop.com" },
  {
    name: "Admin",
    email: "admin@mernshop.com",
    password: adminPassword,
    isAdmin: true
  },
  { upsert: true, new: true }
);

console.log("Seed completed.");
console.log("Admin: admin@mernshop.com / Admin@123");
process.exit(0);
