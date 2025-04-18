"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { notFound, useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CopyIcon, Eye, Globe, GlobeLock } from "lucide-react";
import { toast } from "sonner";
import { FormTabs } from "@/components/forms/tabs/form-tabs";
import { PublishFormButton } from "@/components/forms/publish/publish-form-button";

export default function FormPage() {
  const router = useRouter();
  const formId = useParams().id as Id<"forms">;

  const form = useQuery(api.forms.getForm, { formId });
  const formFields = useQuery(api.formFields.getFormFields, { formId }) || [];
  const updateForm = useMutation(api.forms.updateForm);

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

  if (form === null) {
    notFound();
  }

  const copyShareLink = () => {
    const shareLink = `${window.location.origin}/forms/${formId}`;
    navigator.clipboard.writeText(shareLink);
    toast.success("Share link copied to clipboard!");
  };

  const handlePublishToggle = async () => {
    try {
      const newStatus = form.status === "published" ? "draft" : "published";
      await updateForm({
        formId,
        status: newStatus,
      });
      toast.success(
        newStatus === "published"
          ? "Form published successfully! It's now accessible to the public."
          : "Form unpublished. It's now in draft mode."
      );
    } catch (error) {
      console.error("Error updating form status:", error);
      toast.error("Failed to update form status. Please try again.");
    }
  };

  const isPublished = form.status === "published";

  const openPreviewMode = () => {
    window.open(`/forms/${formId}/preview`, "_blank");
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
          <PublishFormButton
            isPublished={isPublished}
            onPublishToggle={handlePublishToggle}
          />

          <Button variant="outline" size="sm" onClick={copyShareLink}>
            <CopyIcon className="h-4 w-4 mr-2" />
            Copy Share Link
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={openPreviewMode}
            className="text-orange-500 hover:text-orange-600"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{form.title}</h1>
          {isPublished ? (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-500/10 text-green-600 border-green-500/20 transition-colors">
              <Globe className="h-3 w-3 mr-1" />
              Published
            </div>
          ) : (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-600 border-amber-500/20 transition-colors">
              <GlobeLock className="h-3 w-3 mr-1" />
              Draft
            </div>
          )}
        </div>
        {form.description && (
          <p className="text-muted-foreground mt-2">{form.description}</p>
        )}
      </div>

      <FormTabs form={form} formFields={formFields} formId={formId} />
    </div>
  );
}
