"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormPreviewChat } from "@/components/forms/playground/form-preview-chat";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useState } from "react";
import { Form, FormField } from "@/lib/types";

interface FormRendererProps {
  form: Form;
  formFields: FormField[];
}

export default function FormRenderer({ form, formFields }: FormRendererProps) {
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
        respondentEmail: null, // Could be collected if needed
        startedAt: new Date().toISOString(),
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
    <Card className="shadow-md">
      <CardContent className="p-0 h-[650px]">
        <FormPreviewChat
          title={form.title}
          description={form.description || ""}
          fields={formFields}
          onComplete={handleFormSubmit}
        />
      </CardContent>
    </Card>
  );
}
