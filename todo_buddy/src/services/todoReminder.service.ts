import cron from "node-cron";
import {Todo} from "../models/todo";
import {User} from "../models/user";
import { sendNotification } from "./notification.service";

// Runs every minute
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const todos = await Todo.findAll({ where: { completed: false } });

  for (const todo of todos) {
    if (todo.dueDate && new Date(todo.dueDate).getTime() - now.getTime() < 30 * 60 * 1000) {
      const user = await User.findByPk(todo.userId);
      if (user?.fcmToken) {
        await sendNotification(
          user.fcmToken,
          "Reminder",
          `Your task "${todo.title}" is due soon!`
        );
      }
    }
  }
});
