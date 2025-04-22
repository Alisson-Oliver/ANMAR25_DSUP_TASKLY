import { Request, Response } from "express";
import NoteService from "../services/NoteService.js";

class NoteController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { taskId } = req.params;
      const taskIdNumber = Number(taskId);

      if (!taskIdNumber || isNaN(Number(taskIdNumber))) {
        res.status(400).json({ error: "id is required" });
        return;
      }

      data.task = { id: taskIdNumber };

      const newNote = await NoteService.create(data);
      res.status(201).json(newNote);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "task not found") {
          res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export default new NoteController();
