"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useState } from "react";
import { FormPreviewChat } from "@/components/forms/playground/form-preview-chat";
import { Form, FormField } from "@/lib/types";

interface FullscreenFormRendererProps {
  form: Form;
  formFields: FormField[];
}

export default function FullscreenFormRenderer({
  form,
  formFields,
}: FullscreenFormRendererProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitResponse = useMutation(api.responses.submitResponse);

  const handleFormSubmit = async (answers: Record<string, string>) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formattedAnswers = Object.entries(answers).map(
        ([fieldId, value]) => ({
          fieldId: fieldId as Id<"formFields">,
          value: value,
        })
      );

      await submitResponse({
        formId: form._id,
        answers: formattedAnswers,
        respondentEmail: null,
      });

      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-69px)] w-full flex">
      <div className="hidden lg:block lg:w-1/5 "></div>

      <div className="w-full lg:w-3/5 h-full flex flex-col overflow-hidden">
        <FormPreviewChat
          title={form.title}
          description={form.description || ""}
          fields={formFields}
          onComplete={handleFormSubmit}
          fullscreen={true}
        />
      </div>

      <div className="hidden lg:block lg:w-1/5 "></div>
    </div>
  );
}
