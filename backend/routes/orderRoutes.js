import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createOrder, getMyOrders, getOrder, getAllOrders, updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.use(protect);
router.post("/", createOrder);
router.get("/mine", getMyOrders);
router.get("/admin/all", adminOnly, getAllOrders);
router.put("/:id/status", adminOnly, updateOrderStatus);
router.get("/:id", getOrder);

export default router;
