"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ArchivedFormsHeader } from "./archived-forms-header";
import { ArchivedFormsDataTable } from "./archived-forms-data-table";
import { UnarchiveFormDialog } from "./unarchive-form-dialog";

export function ArchivedFormsTable() {
  const archivedForms = useQuery(api.forms.listArchivedForms) || [];
  const [formToUnarchive, setFormToUnarchive] =
    React.useState<Id<"forms"> | null>(null);
  const [isUnarchiveDialogOpen, setIsUnarchiveDialogOpen] =
    React.useState(false);

  const handleUnarchiveRequest = (formId: Id<"forms">, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    setFormToUnarchive(formId);
    setIsUnarchiveDialogOpen(true);
  };

  const handleUnarchiveComplete = () => {
    setFormToUnarchive(null);
    setIsUnarchiveDialogOpen(false);
  };

  // Find form title for the unarchive dialog
  const formToUnarchiveTitle = formToUnarchive
    ? archivedForms.find((form) => form._id === formToUnarchive)?.title ||
      "this form"
    : "this form";

  return (
    <div className="space-y-4">
      <ArchivedFormsHeader />

      <ArchivedFormsDataTable
        forms={archivedForms}
        onUnarchiveRequest={handleUnarchiveRequest}
      />

      <UnarchiveFormDialog
        open={isUnarchiveDialogOpen}
        onOpenChange={setIsUnarchiveDialogOpen}
        formId={formToUnarchive}
        formTitle={formToUnarchiveTitle}
        onComplete={handleUnarchiveComplete}
      />
    </div>
  );
}
