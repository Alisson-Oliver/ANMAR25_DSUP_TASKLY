import { Request, Response } from "express";
import NoteService from "../services/NoteService.js";

class NoteController {
  async findAll(req: Request, res: Response) {
    try {
      const notes = await NoteService.findAll();
      res.status(200).json({ data: { notes } });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async findByIdTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const taskIdNumber = Number(taskId);

      if (!taskIdNumber || isNaN(Number(taskIdNumber))) {
        res.status(400).json({ error: "id is required" });
        return;
      }

      const notes = await NoteService.findByIdTask(taskIdNumber);
      res.status(200).json({ data: { notes } });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "note not found") {
          res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
      }
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idNumber = Number(id);

      if (!idNumber || isNaN(Number(idNumber))) {
        res.status(400).json({ error: "id is required" });
        return;
      }

      const note = await NoteService.findById(idNumber);
      res.status(200).json(note);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "note not found") {
          res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
      }
    }
  }

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
