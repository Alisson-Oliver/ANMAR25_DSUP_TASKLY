import { Request, Response } from "express";
import TaskService from "../services/TaskService";
import { TaskStatus } from "../entities/Task";

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

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idNumber = Number(id);

      if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "id is required" });
      }

      const task = await TaskService.findById(idNumber);
      res.status(200).json({ task });
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
}

export default new TaskController();
