import { formGenerationPrompt } from "@/lib/prompts/form-gen-prompt";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { FormGeneration, formGenerationSchema } from "@/lib/schema";

/**
 * Generates form questions based on the provided prompt using Google's Gemini model
 * @param prompt - User prompt describing the form they want to create
 * @returns Generated form with title, description, and questions
 */
export async function generateFormQuestions(
  prompt: string
): Promise<FormGeneration> {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("Please don't forget to set your Google API key");
  }

  try {
    // Use Vercel AI SDK to generate structured form data
    const result = await generateObject({
      model: google("gemini-1.5-pro-latest", {
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
      schema: formGenerationSchema,
      prompt: `${formGenerationPrompt}\n\nUser's form request: ${prompt}\n\nGenerate a complete form structure based on this request.`,
      temperature: 0.7,
    });

    const formData = result.object;

    return {
      title: formData.title,
      description: formData.description,
      questions: formData.questions.map((q) => ({
        content: q.content,
        type: q.type,
        required: q.required,
      })),
    };
  } catch (error) {
    console.error("Error generating form questions:", error);
    throw new Error(
      "Failed to generate form questions. Please try again later."
    );
  }
}

/**
 * Utility function to shorten and sanitize a string for use as a URL slug
 * @param str - The string to convert to a slug
 * @returns A URL-friendly slug string
 */
export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50); // Limit length
}
