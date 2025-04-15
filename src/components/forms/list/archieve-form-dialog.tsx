"use client";

import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ArchiveFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formId: Id<"forms"> | null;
  formTitle: string;
  onComplete: () => void;
}

export function ArchiveFormDialog({
  open,
  onOpenChange,
  formId,
  formTitle,
  onComplete,
}: ArchiveFormDialogProps) {
  const archiveForm = useMutation(api.forms.archieveForm);
  const [isArchiving, setIsArchiving] = React.useState(false);

  const handleArchiveConfirm = async () => {
    if (!formId) return;

    setIsArchiving(true);

    try {
      await archiveForm({ formId });
      toast.success("Form archived successfully!");
      onComplete();
    } catch (error) {
      console.error("Failed to archive form:", error);
      toast.error("Failed to archive form. Please try again.");
    } finally {
      setIsArchiving(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Archive Form
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to archive{" "}
            <span className="font-semibold">&quot;{formTitle}&quot;</span>? This form will
            be removed from your forms list but its data will be preserved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isArchiving}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleArchiveConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            disabled={isArchiving}
          >
            {isArchiving ? "Archiving..." : "Archive"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
