import { AppDataSource } from "../config/data-source";
import { Task } from "../entities/Task";

class TaskRepository {
  private repository = AppDataSource.getRepository(Task);

  async create(noteData: Partial<Task>) {
    const note = this.repository.create(noteData);
    return await this.repository.save(note);
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }
}

export default new TaskRepository();
