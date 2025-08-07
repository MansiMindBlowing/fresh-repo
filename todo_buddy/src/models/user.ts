import { UserRole } from "../enums/UserRole";
import { IUser } from "interface/IUser";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Todo } from "./todo";

@Entity("user")
export class User implements IUser {
  @PrimaryColumn({ type: "uuid", unique: true, default: () => "gen_random_uuid()" })
  id: string;
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "enum", enum: UserRole })
  role: UserRole;

  @Column({ type: "text" })
  invited_by: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  
  @CreateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}






