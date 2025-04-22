import { Router } from "express";
import {
  validateNoteAdd,
  validateNoteUpdate,
} from "../middlewares/validation.middleware.js";
import NoteController from "../controllers/NoteController.js";

const router = Router();

router.get("/tasks/:taskId/notes", NoteController.findByIdTask);
router.post("/tasks/:taskId/notes", validateNoteAdd, NoteController.create);

export default router;
