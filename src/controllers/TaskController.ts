import { Request, Response } from "express";
import TaskService from "../services/TaskService";

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
}

export default new TaskController();
