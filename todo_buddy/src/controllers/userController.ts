import { AppDataSource } from "../connection/database"
import { User } from "../models/user"
import { Request, Response } from "express"

export const getAllUsers = async (req: Request, res: Response)=>{
    try{
        const userRepo = AppDataSource.getRepository(User)
        const users = await userRepo.find();

        res.status(200).json(userRepo);
    }catch(error){
        res.status(500).json({message: "internal server eror"});
    }
}