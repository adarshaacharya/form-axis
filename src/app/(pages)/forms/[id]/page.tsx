import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import PublicFormRenderer from "@/components/forms/public/public-form-renderer";

interface FormPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: FormPageProps): Promise<Metadata> {
  const formId = (await params).id as Id<"forms">;
  const form = await fetchQuery(api.forms.getPublicForm, {
    formId: formId,
  });

  if (!form) {
    return {
      title: "Form Not Found",
    };
  }

  return {
    title: `${form.title} | Form Pilot`,
    description: form.description || "Complete this form",
  };
}

export default async function FormPage({ params }: FormPageProps) {
  const formId = (await params).id as Id<"forms">;

  // Use the public form query that doesn't require authentication
  const form = await fetchQuery(api.forms.getPublicForm, { formId });

  if (!form) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <h1 className="text-2xl font-bold mb-2">Form Not Available</h1>
        <p className="text-muted-foreground text-center max-w-md">
          This form either doesn't exist or hasn't been published yet.
        </p>
      </div>
    );
  }

  const formFields = await fetchQuery(api.formFields.getFormFields, {
    formId,
  });

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 md:px-0">
      <PublicFormRenderer form={form} formFields={formFields} />
    </div>
  );
}
