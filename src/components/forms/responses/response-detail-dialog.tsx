"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

interface ResponseDetailDialogProps {
  responseId: Id<"responses">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResponseDetailDialog({
  responseId,
  open,
  onOpenChange,
}: ResponseDetailDialogProps) {
  const responseDetails = useQuery(api.responses.getResponseDetails, {
    responseId,
  });

  const isLoading = responseDetails === undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Response Details</DialogTitle>
          <DialogDescription>
            {responseDetails &&
              `Submitted ${format(new Date(responseDetails.submittedAt), "PPPp")}`}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4 py-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div className="py-4 space-y-4">
            {responseDetails?.enhancedAnswers.map((answer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-1"
              >
                <h3 className="font-medium text-sm">{answer.fieldLabel}</h3>
                <p className="bg-muted p-3 rounded-md text-sm">
                  {answer.value || "No answer provided"}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
