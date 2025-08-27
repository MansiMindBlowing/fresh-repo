import { Request, Response } from "express";
import {User} from "../models/user";
import { AppDataSource } from "../connection/database";
import { sendNotification } from "../services/notification.service";
import { Token } from "typedi";

const userRepo = AppDataSource.getRepository(User);

export const saveFcmToken = async (req: Request, res: Response) => {
  try {
    const { token, userId } = req.body;

    if (!token || !userId) {
      return res.status(400).json({ error: "Missing token or userId" });
    }

     const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.fcmToken = token;
   await userRepo.save(user); 

    return res.json({ success: true, message: "Token saved successfully" });
  } catch (err) {
    console.error("Error saving FCM token:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const triggerNotification = async (req: Request, res: Response) => {
  try {
    const { userId, title, body } = req.body;
    if (!userId || !title || !body) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const response = await sendNotification(userId, title, body);
    res.json({ success: true, response });
  } catch (err) {
    res.status(500).json({ error: "Failed to send notification" });
  }
};
