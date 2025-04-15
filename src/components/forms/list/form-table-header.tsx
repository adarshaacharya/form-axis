import React from "react";
import CreateFormButton from "@/components/prompt-dialog/create-form-button";

export function FormTableHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Your Forms</h1>
        <p className="text-muted-foreground mt-2">
          Manage your forms, view responses, and edit settings.
        </p>
      </div>
      <CreateFormButton label="Generate Form" />
    </div>
  );
}
