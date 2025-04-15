"use client";

import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { ArchiveRestore } from "lucide-react";

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

interface UnarchiveFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formId: Id<"forms"> | null;
  formTitle: string;
  onComplete: () => void;
}

export function UnarchiveFormDialog({
  open,
  onOpenChange,
  formId,
  formTitle,
  onComplete,
}: UnarchiveFormDialogProps) {
  const unarchiveForm = useMutation(api.forms.unArchiveForm);
  const [isUnarchiving, setIsUnarchiving] = React.useState(false);

  const handleUnarchiveConfirm = async () => {
    if (!formId) return;

    setIsUnarchiving(true);

    try {
      await unarchiveForm({ formId });
      toast.success("Form restored successfully!");
      onComplete();
    } catch (error) {
      console.error("Failed to restore form:", error);
      toast.error("Failed to restore form. Please try again.");
    } finally {
      setIsUnarchiving(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <ArchiveRestore className="h-5 w-5 text-primary" />
            Restore Form
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to restore{" "}
            <span className="font-semibold">&quot;{formTitle}&quot;</span>? This will make
            the form visible in your forms list again as a draft.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isUnarchiving}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleUnarchiveConfirm}
            className="bg-primary hover:bg-primary/90"
            disabled={isUnarchiving}
          >
            {isUnarchiving ? "Restoring..." : "Restore Form"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
