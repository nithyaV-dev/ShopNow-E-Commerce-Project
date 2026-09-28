import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getCart, addToCart, updateCartItem, removeCartItem, clearCart
} from "../controllers/cartController.js";

const router = express.Router();

router.use(protect);
router.get("/", getCart);
router.post("/", addToCart);
router.put("/:itemId", updateCartItem);
router.delete("/:itemId", removeCartItem);
router.delete("/", clearCart);

export default router;
