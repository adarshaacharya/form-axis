import { NextRequest, NextResponse } from "next/server";
import { generateFormQuestions } from "./api";
import { z } from "zod";
import { getAuth } from "@clerk/nextjs/server";

const promptSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  topics: z.string().optional(),
});

// Route handler for form generation
export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized", details: "User not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validationResult = promptSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten();
      return NextResponse.json(
        { error: "Invalid request", details: errors },
        { status: 400 }
      );
    }

    const { prompt, topics } = validationResult.data;
    const generatedForm = await generateFormQuestions(prompt, topics);

    console.log("Generated form data:", generatedForm);

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

export async function GET() {
  return NextResponse.json({ status: "Form generation API is running" });
}
