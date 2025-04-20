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
}

export default new TaskService();
