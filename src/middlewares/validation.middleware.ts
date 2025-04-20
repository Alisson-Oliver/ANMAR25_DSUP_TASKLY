import { NextFunction, Request, Response } from "express";
import { taskSchemaAdd, taskSchemaUpdate } from "../schemas/taskSchema";
import { noteSchemaAdd } from "../schemas/noteSchema";

export function validateTaskAdd(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validation = taskSchemaAdd.safeParse(req.body);

  if (!validation.success) {
    const errosDetails = validation.error.errors.map(
      (detail) => detail.message,
    );
    res.status(400).json({ erros: errosDetails });
    return;
  }

  next();
}

export function validateNoteAdd(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validation = noteSchemaAdd.safeParse(req.body);

  if (!validation.success) {
    const errosDetails = validation.error.errors.map(
      (detail) => detail.message,
    );
    res.status(400).json({ errors: errosDetails });
    return;
  }

  next();
}

export function validateTaskUpdate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.body.id) {
    delete req.body.id;
  }

  console.log(req.body);

  const validation = taskSchemaUpdate.safeParse(req.body);

  if (!validation.success) {
    const errosDetails = validation.error.errors.map(
      (detail) => detail.message,
    );
    res.status(400).json({ errors: errosDetails });
    return;
  }

  next();
}
