import { DataSource } from 'typeorm';


import bcrypt from 'bcryptjs'
// import dotenv from 'dotenv';
import { config } from "dotenv";
import { UserRole } from '../enums/UserRole';
import { User } from '../models/user'
import { Todo } from '../models/todo';

config();

export const AppDataSource = new DataSource({

  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'todo_app',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'false',
  entities: [Todo, User],
  migrations: [],
  subscribers: [],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection initialized successfully');

    const adminExists = await AppDataSource.getRepository(User).count();

    if(adminExists===0){
      const superAdmin = new User;

      superAdmin.name = "Super Admin";
      superAdmin.email = "mansi.kuraria@mindbowser.com";
      const password = "Mansi@123";

      if(!password){
        throw new Error(
          "PAssword not provided"
        )
      }

      superAdmin.password = await bcrypt.hash(password,10);
      superAdmin.role = UserRole.ADMIN;
      superAdmin.invited_by="system";

      await AppDataSource.getRepository(User).save(superAdmin);
      console.log("Super admin added successfully!!");
    }
  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
}; 