import { Router } from "express";
import TaskController from "../controllers/TaskController";
import { validateTask } from "../middlewares/validation.middleware";

const router = Router();

router.get("/tasks/:id", TaskController.findById);
router.post("/tasks", validateTask, TaskController.create);

export default router;
