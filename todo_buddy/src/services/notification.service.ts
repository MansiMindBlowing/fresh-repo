import { AppDataSource } from "../connection/database";
import admin from "firebase-admin";
import { User } from "../models/user";
import path from "path";

const userRepo = AppDataSource.getRepository(User);

const serviceAccount = require(path.join(__dirname, "../config/firebase-service-account.json"));
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n")

if (!admin.apps.length) {
  admin.initializeApp({
    
    credential: admin.credential.cert({
      projectId: process.env.project_id,
      clientEmail: process.env.client_email,
      
      privateKey: process.env.private_key?.replace(/\\n/g, "\n"),
    }),
  });
}



export const sendNotification = async (userId: string, title: string, body: string) => {
  try {

     const user = await userRepo.findOne({ where: { id: userId } });

    if (!user || !user.fcmToken) {
      console.log("User does not exist or no FCM token found");
      return null;
    }

    const message = {
      token: user.fcmToken,
      notification: { title, body },
    };

    const response = await admin.messaging().send(message);
    console.log("Notification sent:", response);
     return response;

  } catch (error) {
    console.error("Error sending notification:", error);
    throw err;
  }
};
