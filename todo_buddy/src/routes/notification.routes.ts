import { Router } from "express";
import { saveFcmToken, triggerNotification } from "../controllers/notificationController";

const router = Router();

router.post("/register", saveFcmToken);
router.post("/send", triggerNotification);

export default router;
