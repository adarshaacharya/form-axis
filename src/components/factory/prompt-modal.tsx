"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PromptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
}

export function PromptModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: PromptModalProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim().length === 0) return;
    onSubmit(prompt);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create a new form</DialogTitle>
          <DialogDescription>
            Describe the context of the form you want to create. Be as specific
            as possible.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="For example: A customer satisfaction survey for an e-commerce website that sells electronics"
            className="min-h-[150px]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || prompt.trim().length === 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Next"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
