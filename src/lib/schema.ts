import { z } from "zod";

const fieldTypeSchema = z.enum([
  "shortText",
  "longText",
  "number",
  "email",
  "phone",
  "calendar",
]);
export type FieldType = z.infer<typeof fieldTypeSchema>;

const questionSchema = z.object({
  content: z.string().min(1, "Question content is required"),
  required: z.boolean(),
  type: fieldTypeSchema,
});
export type Question = z.infer<typeof questionSchema>;

export const formGenerationSchema = z.object({
  title: z.string(),
  description: z.string(),
  questions: z.array(questionSchema),
});

export type FormGeneration = z.infer<typeof formGenerationSchema>;
