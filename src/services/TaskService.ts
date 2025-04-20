import TaskRepository from "../repositories/TaskRepository";
import { Task, TaskStatus } from "../entities/Task";

class TaskService {
  async create(date: Partial<Task>) {
    return await TaskRepository.create(date);
  }

  async findById(id: number) {
    const task = await TaskRepository.findById(id);
    if (!task) {
      throw new Error("task not found");
    }

    return task;
  }

  async findByStatus(status: TaskStatus) {
    return await TaskRepository.findByStatus(status);
  }

  async update(newData: Partial<Task>, id: number) {
    const result = await TaskRepository.update(newData, id);

    if (result.affected === 0) {
      throw new Error("task not found");
    }
  }

  async delete(id: number) {
    const result = await TaskRepository.delete(id);

    if (result.affected === 0) {
      throw new Error("task not found");
    }
  }
}

export default new TaskService();
