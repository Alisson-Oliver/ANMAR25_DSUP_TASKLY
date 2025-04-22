import { Router } from "express";
import TaskController from "../controllers/TaskController.js";
import {
  validateTaskAdd,
  validateTaskUpdate,
} from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/tasks/status/:status", TaskController.findByStatus);
router.get("/tasks", TaskController.findAll);
router.get("/tasks/:id", TaskController.findById);
router.post("/tasks", validateTaskAdd, TaskController.create);
router.put("/tasks/:id", validateTaskUpdate, TaskController.update);
router.delete("/tasks/:id", TaskController.delete);

export default router;
