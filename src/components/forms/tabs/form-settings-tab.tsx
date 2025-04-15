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
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Form Settings</h2>
      <div className="flex items-center gap-4">
        <span>Publish Form</span>
        <Switch checked={isPublished} onCheckedChange={handlePublishToggle} />
      </div>
    </div>
  );
}
