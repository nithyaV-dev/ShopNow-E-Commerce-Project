import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized. Please login." });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found." });
    }

    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token." });
  }
}

export function adminOnly(req, res, next) {
  if (req.user?.isAdmin) return next();
  return res.status(403).json({ message: "Admin access required." });
}
