"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { FormTableHeader } from "./form-table-header";
import { FormDataTable } from "./form-data-table";
import { ArchiveFormDialog } from "./archieve-form-dialog";

export function FormsTable() {
  const forms = useQuery(api.forms.listForms) || [];
  const router = useRouter();
  const [formToArchive, setFormToArchive] = React.useState<Id<"forms"> | null>(
    null
  );
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = React.useState(false);

  const navigateToFormEditPage = (formId: Id<"forms">) => {
    router.push(`/dashboard/forms/${formId}`);
  };

  const handleArchiveRequest = (formId: Id<"forms">, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click when attempting to archive
    setFormToArchive(formId);
    setIsArchiveDialogOpen(true);
  };

  const handleArchiveComplete = () => {
    setFormToArchive(null);
    setIsArchiveDialogOpen(false);
  };

  const formToArchiveTitle = formToArchive
    ? forms.find((form) => form._id === formToArchive)?.title || "this form"
    : "this form";

  return (
    <div className="space-y-4">
      <FormTableHeader />

      <FormDataTable
        forms={forms}
        onRowClick={navigateToFormEditPage}
        onArchiveRequest={handleArchiveRequest}
      />

      <ArchiveFormDialog
        open={isArchiveDialogOpen}
        onOpenChange={setIsArchiveDialogOpen}
        formId={formToArchive}
        formTitle={formToArchiveTitle}
        onComplete={handleArchiveComplete}
      />
    </div>
  );
}
