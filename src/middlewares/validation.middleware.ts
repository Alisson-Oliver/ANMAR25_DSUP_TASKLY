import { NextFunction, Request, Response } from "express";
import { taskSchema } from "../schemas/taskSchema";
import { noteSchema } from "../schemas/noteSchema";

export function validateTask(req: Request, res: Response, next: NextFunction) {
  const validation = taskSchema.safeParse(req.body);

  if (!validation.success) {
    const errosDetails = validation.error.errors.map(
      (detail) => detail.message,
    );
    res.status(400).json({ erros: errosDetails });
    return;
  }

  next();
}

export function validateNote(req: Request, res: Response, next: NextFunction) {
  const validation = noteSchema.safeParse(req.body);

  if (!validation.success) {
    const errosDetails = validation.error.errors.map(
      (detail) => detail.message,
    );
    res.status(400).json({ errors: errosDetails });
    return;
  }

  next();
}
