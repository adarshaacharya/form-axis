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

interface AddPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
}

export function AddPromptModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: AddPromptProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim().length === 0) return;
    onSubmit(prompt);
  };

  return (
    <Dialog open={open} onOpenChange={isLoading ? () => {} : onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        {isLoading && (
          <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-background rounded-lg shadow-lg p-6 max-w-md mx-auto">
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
                <div>
                  <h3 className="font-medium text-lg">
                    Generating questions...
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    This may take a few seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
            disabled={isLoading}
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
