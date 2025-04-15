"use client";

import CreateFormButton from "@/components/prompt-dialog/create-form-button";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your conversational forms and responses.
        </p>
      </div>
      <CreateFormButton />
    </div>
  );
}
