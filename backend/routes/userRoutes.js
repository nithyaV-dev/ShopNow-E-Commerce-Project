import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();
router.get("/", protect, adminOnly, getUsers);

export default router;
