import TaskRepository from "../repositories/TaskRepository";
import { Task } from "../entities/Task";

class TaskService {
  async create(date: Partial<Task>) {
    return await TaskRepository.create(date);
  }
}

export default new TaskService();
