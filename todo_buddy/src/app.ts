import "reflect-metadata";
import express, { Application } from "express";
import authRoutes from './routes/authRoutes';
import  invitedRoutes  from "./routes/invite.routes";
import userRoutes from './routes/user.routes'
import todoRoutes from './routes/todo.routes'

export class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHanding();
  }
  private initializeMiddlewares(): void {
    this.app.use(express.json()); 
  }
  private initializeRoutes(): void {
    this.app.use('/api',authRoutes);
    this.app.use('/api',invitedRoutes);
    this.app.use("/admin", userRoutes)
    this.app.use('/api/todos', todoRoutes)
  }
  private initializeErrorHanding(): void {
  }
  public getApp(): Application {
    return this.app;
  }
  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }
}