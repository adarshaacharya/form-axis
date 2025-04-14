"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CopyIcon, Eye } from "lucide-react";
import { toast } from "sonner";
import { FormPreviewPanel } from "@/components/forms/playground/form-preview-panel";
import { FormEditorPanel } from "@/components/forms/playground/form-editor-panel";

export default function FormPage() {
  const router = useRouter();
  const formId = useParams().id as Id<"forms">;
  const [activeTab, setActiveTab] = useState<"fields" | "settings">("fields");

  // Fetch form data
  const form = useQuery(api.forms.getForm, { formId });
  const formFields = useQuery(api.formFields.getFormFields, { formId }) || [];

  // Loading state
  if (form === undefined) {
    return (
      <div className="py-8 px-4 space-y-8">
        <div>
          <Skeleton className="h-10 w-28" />
        </div>
        <div>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-[600px] rounded-md" />
          <Skeleton className="h-[600px] rounded-md" />
        </div>
      </div>
    );
  }

  // Handle not found
  if (form === null) {
    notFound();
  }

  const copyShareLink = () => {
    const shareLink = `${window.location.origin}/forms/${formId}/submit`;
    navigator.clipboard.writeText(shareLink);
    toast.success("Share link copied to clipboard!");
  };

  return (
    <div className="py-8 px-4 space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard/forms")}
          className="w-fit"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Forms
        </Button>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={copyShareLink}>
            <CopyIcon className="h-4 w-4 mr-2" />
            Copy Share Link
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`/forms/${formId}/submit`, "_blank")}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">{form.title}</h1>
        {form.description && (
          <p className="text-muted-foreground mt-2">{form.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[700px]">
        <div className="flex flex-col">
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "fields" | "settings")
            }
            className="mb-4"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="fields">Form Fields</TabsTrigger>
              <TabsTrigger value="settings">Form Settings</TabsTrigger>
            </TabsList>
          </Tabs>

          <FormEditorPanel
            form={form}
            formFields={formFields}
            activeTab={activeTab}
            formId={formId}
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-2 h-10"></div> {/* Spacer to align with tabs */}
          <FormPreviewPanel form={form} formFields={formFields} />
        </div>
      </div>
    </div>
  );
}
