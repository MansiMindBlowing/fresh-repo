import { AppDataSource } from "../connection/database";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

export const adminMiddleware = async(req: Request, res: Response, next: NextFunction)=>{

    const userId = (req as any).user?.id;

    const userRepo = AppDataSource.getRepository(User);

    const userCheck = await userRepo.findOne({where: { id: userId}})

    if(!userCheck){
        // throw new Error({message: 'user not found'})
        return res.status(404).json({message: 'user nahi h'})
    }

    if(userCheck.role!=='admin'){
        return res.status(500).json({message: 'only admins allowed'})
    }

    next();

}