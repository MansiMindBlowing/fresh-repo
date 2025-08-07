import { getAllUsers } from "../controllers/userController";
import { Router } from "express";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router()
router.get('/users',authMiddleware, adminMiddleware, getAllUsers)

export default router;