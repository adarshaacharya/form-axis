"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { updateForm } from "@/convex/forms";

export function FormSettingsTab({ form, formId }) {
  const [isPublished, setIsPublished] = useState(form.status === "published");

  const handlePublishToggle = async (publishState: boolean) => {
    try {
      await updateForm({
        formId,
        status: publishState ? "published" : "draft",
      });
      setIsPublished(publishState);
      toast.success(
        publishState ? "Form published successfully!" : "Form unpublished"
      );
    } catch (error) {
      console.error("Error updating form status:", error);
      toast.error("Failed to update form status. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Form Settings</h2>

      {/* Publication Settings */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Publication Settings</h3>
          <p className="text-sm text-muted-foreground">
            Control the visibility and access to your form.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Form Status</div>
              <div className="text-sm text-muted-foreground">
                {form.status === "published"
                  ? "Your form is currently published and accessible to the public."
                  : "Your form is in draft mode and only visible to you."}
              </div>
            </div>

            <PublishFormButton
              isPublished={form.status === "published"}
              onPublishToggle={handlePublishToggle}
            />
          </div>

          {/* ...other form settings... */}
        </div>
      </div>
    </div>
  );
}
