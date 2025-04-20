import { ILike, Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Task, TaskPriority, TaskStatus } from "../entities/Task";

class TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async create(noteData: Partial<Task>) {
    const note = this.repository.create(noteData);
    return await this.repository.save(note);
  }

  async findAll(
    page: number,
    limit: number,
    filters: {
      title?: string;
      status?: TaskStatus;
      priority?: TaskPriority;
      category?: string;
    },
  ) {
    const where: any = {};

    if (filters.title) {
      where.title = ILike(`%${filters.title}%`);
    }
    if (filters.status) {
      where.status = filters.status;
    }
    if (filters.priority) {
      where.priority = filters.priority;
    }
    if (filters.category) {
      where.category = ILike(`%${filters.category}%`);
    }

    const [tasks, count] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: "DESC" },
    });

    return { tasks, count };
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
