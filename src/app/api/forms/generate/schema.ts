// TODO: make sure to use the schema from convex instead of repeating it here

import { z } from "zod";

// Schema for a single question
const questionSchema = z.object({
  content: z.string().min(1, "Question content is required"),
  required: z.boolean(),
  type: z.enum(["shortText", "longText", "number", "email", "phone", "time"]),
});

// Schema for form generation response
export const formGenerationSchema = z.object({
  title: z.string(),
  description: z.string(),
  questions: z.array(questionSchema),
});

export type Question = z.infer<typeof questionSchema>;
export type FormGeneration = z.infer<typeof formGenerationSchema>;
