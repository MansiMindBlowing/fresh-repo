import { Service } from 'typedi';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { AppDataSource } from '../connection/database';
import { Todo } from '../models/todo'
import { start } from 'repl';

@Service()
export class TodoService {
     private todoRepository: Repository<Todo>;
  private todoRepo: Repository<Todo>;

  constructor() {
    this.todoRepo = AppDataSource.getRepository(Todo);
  }

  async create(data: any, userId: string) {
    console.log("in service method");
    
    const todo = this.todoRepo.create({ ...data, user_id: userId });
    return await this.todoRepo.save(todo);
  }

  async getAll(userId: string, query: any) {
    // return await this.todoRepo.find({
    //   where: { user_id: userId, is_deleted: false },
    //   order: { created_at: 'DESC' },
    // });
        const { 
            page=1,
            limit=3,
            title,
            status,
            priority,
            from_date,
            to_date
        } = query

        const where: any = {
            user_id: userId,
            is_deleted: false
        }
        if(from_date && to_date){
            where.expected_completion = Between(
                new Date(from_date),
                new Date(to_date)
            );

        }else if(from_date){
            where.expected_completion = MoreThanOrEqual(new Date(from_date));
        }else if(to_date){
            where.expected_completion = LessThanOrEqual(new Date(to_date))
        }

        if(status) where.status = status;
        if(priority) where.priority = priority;
        if(title) where.title = title;

    const [todos, total] = await this.todoRepo.findAndCount({
        where,
        order: {created_at: "DESC"},
        skip: (Number(page)-1)*Number(limit),
        // skip: start,
        take: Number(limit)
    });

    return {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total/limit),
        todos
    };
  }

  async getById(id: string, userId: string) {
    const todo = await this.todoRepo.findOne({
      where: { id, user_id: userId, is_deleted: false },
    });
    if (!todo) throw new Error('Todo not found');
    return todo;
  }


  async update(id: string, userId: string, data: any) {
    const todo = await this.getById(id, userId);
    Object.assign(todo, data);
    return await this.todoRepo.save(todo);
  }
  

  async partialUpdate(id: string, userId: string, data: any) {
    const todo = await this.getById(id, userId);
    Object.assign(todo, data);
    return await this.todoRepo.save(todo);
  }

  async softDelete(id: string, userId: string) {
    const todo = await this.getById(id, userId);
    todo.is_deleted = true;
    await this.todoRepo.save(todo);
  }
}
