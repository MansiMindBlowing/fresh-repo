import { Priority } from "../enums/priority";
import { Status } from '../enums/status';
import { Itodo } from "interface/Itodo";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user";

@Entity("todo")
export class Todo implements Itodo {
  @PrimaryColumn({ type: "uuid", unique: true, default: () => "gen_random_uuid()" })
  id?: string | undefined;

  @Column({ type: "text" })
  title: string | undefined;

  @Column({ type: "text", unique: true })
  desc: string | undefined;

  @Column({ type: "enum", enum: Status })
  status: Status;

  @Column({ type: "enum", enum: Priority })
  priority: Priority;

  // @CreateDateColumn({ name: 'expected_completion' })
  // expected_completion?: Date | undefined;

  @Column({ type: "timestamp", nullable: true })
  expected_completion?: Date;

  @Column({ type: "uuid" })
  user_id?: string | undefined;

  @ManyToOne(() => User, (user) => user.todos, {
    onDelete: "CASCADE"
  })

  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "boolean", default: false })
  is_deleted: Boolean | undefined;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date | undefined;




  @CreateDateColumn({ name: 'updated_at' })
  updated_at: Date | undefined;
}






