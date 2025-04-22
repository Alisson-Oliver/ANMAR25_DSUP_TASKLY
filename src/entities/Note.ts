import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { Task } from "./Task.js";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150 })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Task, (task) => task.notes, { onDelete: "CASCADE" })
  task: Task;
}
