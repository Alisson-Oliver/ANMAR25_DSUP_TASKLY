import TaskRepository from "../repositories/TaskRepository.js";
import { Task, TaskPriority, TaskStatus } from "../entities/Task.js";

interface FilterParams {
  title?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
}

class TaskService {
  async create(data: Partial<Task>) {
    return await TaskRepository.create(data);
  }

  async findById(id: number) {
    const task = await TaskRepository.findById(id);
    if (!task) {
      throw new Error("task not found");
    }
    return task;
  }

  async findAll(page: number, limit: number, filters: FilterParams) {
    if (!page || page < 1) {
      page = 1;
    }

    if (!limit) {
      limit = 5;
    } else if (limit > 10) {
      limit = 10;
    }

    const { tasks, count } = await TaskRepository.findAll(page, limit, filters);

    return {
      count,
      pages: Math.ceil(count / limit),
      data: tasks,
    };
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
