import { NextRequest, NextResponse } from "next/server";
import { generateFormQuestions } from "./api";
import { z } from "zod";

const promptSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});

// Route handler for form generation
export async function POST(req: NextRequest) {
  try {
    // TODO:  Check user authentication

    // Parse and validate the request body
    const body = await req.json();
    const validationResult = promptSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten();
      return NextResponse.json(
        { error: "Invalid request", details: errors },
        { status: 400 }
      );
    }

    // Generate form questions based on the prompt
    const { prompt } = validationResult.data;
    const generatedForm = await generateFormQuestions(prompt);

    console.log("Generated form data:", generatedForm);

    // Return the generated form data
    return NextResponse.json({
      title: generatedForm.title,
      description: generatedForm.description,
      questions: generatedForm.questions,
      prompt,
    });
  } catch (error) {
    console.error("Error in form generation API:", error);
    return NextResponse.json(
      { error: "Failed to generate form. Please try again later." },
      { status: 500 }
    );
  }
}

// Optional: Add a GET endpoint to check API health
export async function GET() {
  return NextResponse.json({ status: "Form generation API is running" });
}
