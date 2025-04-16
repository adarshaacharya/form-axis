"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FormProgressBarProps {
  progress: number;
  className?: string;
}

export function FormProgressBar({ progress, className }: FormProgressBarProps) {
  return (
    <Progress value={progress} className={cn("rounded-none h-1", className)} />
  );
}
