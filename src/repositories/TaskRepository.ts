import { FindOperator } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Task, TaskStatus } from "../entities/Task";

class TaskRepository {
  private repository = AppDataSource.getRepository(Task);

  async create(noteData: Partial<Task>) {
    const note = this.repository.create(noteData);
    return await this.repository.save(note);
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async findByStatus(status: TaskStatus) {
    return await this.repository.find({ where: { status } });
  }

  async update(newData: Partial<Task>, id: number) {
    return await this.repository.update(id, newData);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}

export default new TaskRepository();
