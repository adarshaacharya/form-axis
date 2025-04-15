import { FormGeneration } from "./schema";

/**
 * Client-side function to generate form questions
 * @param prompt User's description of the form they want to create
 * @returns Generated form structure
 */
export async function generateForm(prompt: string): Promise<FormGeneration> {
  const response = await fetch("/api/forms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.error || `Failed to generate form: ${response.status}`
    );
  }

  return response.json();
}
