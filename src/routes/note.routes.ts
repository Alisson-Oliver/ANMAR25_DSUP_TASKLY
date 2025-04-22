import { Router } from "express";
import { validateNoteAdd } from "../middlewares/validation.middleware.js";
import NoteController from "../controllers/NoteController.js";

const router = Router();

router.post("/tasks/:taskId/notes", validateNoteAdd, NoteController.create);

export default router;
