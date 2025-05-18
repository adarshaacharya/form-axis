import { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import FullscreenFormRenderer from "@/components/forms/public/fullscreen-form-renderer";
import { BlankPage } from "@/components/fallbacks/blank-page";

interface FormPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: FormPageProps): Promise<Metadata> {
  try {
    const form = await fetchQuery(api.forms.getPublicForm, {
      formId: (await params).id as Id<"forms">,
    });

    if (!form) {
      return {
        title: "Form Not Found",
      };
    }

    const title = form.title || "Preview Form";

    return {
      title,
      description: form.description || "Complete this form",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Form Axis",
      description: "Complete this form",
    };
  }
}

export default async function FormPage({ params }: FormPageProps) {
  const formId = (await params).id as Id<"forms">;

  try {
    const form = await fetchQuery(api.forms.getPublicForm, { formId });

    if (!form) {
      return (
        <BlankPage
          title="Form Not Found"
          description="This form either doesn't exist or hasn't been published yet."
          errorType="not-found"
        />
      );
    }

    const formFields = await fetchQuery(api.formFields.getFormFields, {
      formId,
    });

    return (
      <FullscreenFormRenderer
        form={form}
        formFields={formFields}
        isPreview={false}
      />
    );
  } catch (error) {
    console.error("Error loading form:", error);
    return (
      <BlankPage
        title="Error Loading Form"
        errorType="error"
        description="An error occurred while loading the form. Please try again later."
      />
    );
  }
}
