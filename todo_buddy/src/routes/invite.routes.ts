import { invitedUser } from "../controllers/inviteUserController";
import { addAbortListener } from "events";
import { Router } from "express";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post('/invite', adminMiddleware, authMiddleware, invitedUser)

export default router;