
import cron from "node-cron";
import { AppDataSource } from "../connection/database";
import { Todo } from "../models/todo";
import { User } from "../models/user";
import { sendNotification } from "../services/notification.service";

const todoRepo = AppDataSource.getRepository(Todo);


cron.schedule("* * * * *", async () => {
  console.log("Checking todos due right now...");

  const now = new Date();
  const nowRounded = new Date(now);
  nowRounded.setSeconds(0, 0); 

  try {
    const todos = await todoRepo.find({
      where: { is_deleted: false },
      relations: ["user"],
    });

    for (const todo of todos) {
      if (todo.expected_completion) {
        const due = new Date(todo.expected_completion);
        due.setSeconds(0, 0); 

        if (due.getTime() === nowRounded.getTime()) {
          console.log(`🔔 Task "${todo.title}" is due now! Sending reminder...`);

          const user = todo.user;
          if (user?.fcmToken) {
            await sendNotification(
              user.id,
              "Task Due ",
              `Your task "${todo.title}" is due now!`
            );
          }
        }
      }
    }
  } catch (err) {
    console.error("Cron job error:", err);
  }
});
