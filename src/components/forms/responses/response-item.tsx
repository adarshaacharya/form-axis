"use client";

import { format } from "date-fns";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Response } from "@/lib/types";

interface ResponseItemProps {
  response: Response;
  isSelected: boolean;
  onClick: () => void;
}

export function ResponseItem({
  response,
  isSelected,
  onClick,
}: ResponseItemProps) {
  const submittedDate = new Date(response.submittedAt);

  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      onClick={onClick}
      className={cn(
        "p-3 border-b cursor-pointer transition-colors",
        isSelected && "bg-accent"
      )}
    >
      <div className="flex justify-between items-start mb-1">
        <div className="font-medium text-xs truncate max-w-[70%]">
          {response.respondentEmail || "Anonymous"}
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        {format(submittedDate, "MMM d, h:mm a")}
      </div>
    </motion.div>
  );
}
