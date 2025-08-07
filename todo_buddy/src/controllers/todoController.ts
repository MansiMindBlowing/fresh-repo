import { Request, Response, NextFunction } from 'express';
import { Service, Inject } from 'typedi';
import { TodoService } from '../services/todo.service';
// import { query } from 'typeorm/driver/Query';
// import { Between, Repository } from 'typeorm';
// import { Todo } from 'models/todo';

@Service()
export class TodoController {

    constructor(
        @Inject(() => TodoService) private todoService: TodoService
    ) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("in controller method");

            const userId = (req as any).user?.id;
            const todo = await this.todoService.create(req.body, userId);
            res.status(201).json(todo);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.id;
            const {
                limit = 3,
                page = 1,
                status,
                priority,
                title,
                from_date,
                to_date,

            } = req.query



            // const todos = await this.todoService.getAll(userId);
            // res.status(200).json(todos);
            const todo = await this.todoService.getAll(userId, {
                page: Number(page),
                limit: Number(limit),
                status: status as string,
                priority: priority as string,
                title: title as string,
                from_date: from_date as string,
                to_date: to_date as string,
            });
            res.status(200).json(todo);

        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.id;
            const id = req.params.id;
            const todo = await this.todoService.getById(id, userId);
            res.status(200).json(todo);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.id;
            const id = req.params.id;
            const updated = await this.todoService.update(id, userId, req.body);
            res.status(200).json(updated);
        } catch (error) {
            next(error);
        }
    }

    async partialUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.id;
            const id = req.params.id;
            const updated = await this.todoService.partialUpdate(id, userId, req.body);
            res.status(200).json(updated);
        } catch (error) {
            next(error);
        }
    }

    async softDelete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.id;
            const id = req.params.id;
            await this.todoService.softDelete(id, userId);
            res.status(200).json({ message: 'Todo soft deleted hogya h shabaash' });
        } catch (error) {
            next(error);
        }
    }
}
