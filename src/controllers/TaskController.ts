import { Request, Response } from "express";
import TaskService from "../services/TaskService.js";
import { TaskPriority, TaskStatus } from "../entities/Task.js";

class TaskController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const newTask = await TaskService.create(req.body);
      res.status(201).json(newTask);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit);

    const filters = {
      title: req.query.title as string,
      status: req.query.status as TaskStatus,
      priority: req.query.priority as TaskPriority,
      category: req.query.category as string,
    };

    const result = await TaskService.findAll(page, limit, filters);

    res.json(result);
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idNumber = Number(id);

      if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "id is required" });
      }

      const task = await TaskService.findById(idNumber);
      res.status(200).json(task);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async findByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;

      if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
        res.status(400).json({ error: "invalid status" });
      }

      const tasks = await TaskService.findByStatus(status as TaskStatus);

      res.json({ data: tasks });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idNumber = Number(id);
      const updateData = req.body;

      if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "id is required" });
      }

      await TaskService.update(updateData, idNumber);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idNumber = Number(id);

      if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "id is required" });
      }

      await TaskService.delete(idNumber);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export default new TaskController();
