import Container from "typedi";
import { TodoController  } from "../controllers/todoController";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const todoController = Container.get(TodoController);

console.log("todo loaded");

router.post('/', authMiddleware,(req,res,next)=>todoController.create(req,res,next));
router.get('/', authMiddleware,(req,res,next)=>todoController.getAll(req,res,next));
router.get('/:id', authMiddleware,(req,res,next)=>todoController.getById(req,res,next));
router.patch('/:id',authMiddleware,(req,res,next)=>todoController.partialUpdate(req,res,next));
router.put('/:id', authMiddleware,(req,res,next)=>todoController.update(req,res,next));
router.delete('/:id', authMiddleware,(req,res,next)=>todoController.softDelete(req,res,next));

export default router;
