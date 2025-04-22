import { z } from "zod";
import { TaskPriority, TaskStatus } from "../entities/Task.js";

export const taskSchemaAdd = z.object({
  title: z
    .string({ required_error: "'title' is required" })
    .min(1, { message: "'title' cannot be empty" })
    .max(100, { message: "'title' must have at most 100 characters" }),

  description: z
    .string()
    .min(1, { message: "'description' cannot be empty" })
    .max(250, { message: "'description' must have at most 250 characters" })
    .optional(),

  status: z
    .nativeEnum(TaskStatus, {
      required_error: "'status' is required",
      invalid_type_error:
        "'status' must be one of: 'todo', 'in_progress', 'done'",
    })
    .optional(),

  priority: z
    .nativeEnum(TaskPriority, {
      invalid_type_error: "'priority' must be one of: 'low', 'medium', 'high'",
    })
    .optional(),

  category: z
    .string()
    .min(1, { message: "'category' cannot be empty" })
    .max(50, { message: "'category' must have at most 50 characters" })
    .optional(),
});

export const taskSchemaUpdate = z.object({
  title: z
    .string()
    .min(1, { message: "'title' cannot be empty" })
    .max(100, { message: "'title' must have at most 100 characters" })
    .optional(),

  description: z
    .string()
    .min(1, { message: "'description' cannot be empty" })
    .max(250, { message: "'description' must have at most 250 characters" })
    .optional(),

  status: z
    .nativeEnum(TaskStatus, {
      required_error: "'status' is required",
      invalid_type_error:
        "'status' must be one of: 'todo', 'in_progress', 'done'",
    })
    .optional(),

  priority: z
    .nativeEnum(TaskPriority, {
      invalid_type_error: "'priority' must be one of: 'low', 'medium', 'high'",
    })
    .optional(),

  category: z
    .string()
    .min(1, { message: "'category' cannot be empty" })
    .max(50, { message: "'category' must have at most 50 characters" })
    .optional(),
});
