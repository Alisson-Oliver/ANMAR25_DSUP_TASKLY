import { z } from "zod";

export const noteSchemaAdd = z.object({
  content: z
    .string({ required_error: "'content' is required" })
    .min(1, "'content' cannot be empty")
    .max(150, "'content' must be at most 150 characters"),
});

export const noteSchemaUpdate = z.object({
  content: z
    .string()
    .min(1, "'content' cannot be empty")
    .max(150, "'content' must be at most 150 characters")
    .optional(),
});
