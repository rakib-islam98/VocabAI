import { z } from "zod";

export const addWordSchema = z.object({
  word: z
    .string()
    .min(1, "Word is required")
    .max(100),

  sourceSentence: z
    .string()
    .max(1000)
    .optional(),
});