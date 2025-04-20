import { z } from "zod";

export const noteSchema = z.object({
  content: z
    .string({ required_error: "'content' is required" })
    .min(1, "'content' cannot be empty")
    .max(150, "'content' must be at most 150 characters"),
});
