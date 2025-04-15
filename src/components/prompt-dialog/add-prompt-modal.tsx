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
import { Loader2, Info } from "lucide-react";

interface AddPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { prompt: string; topics?: string }) => void;
  isLoading?: boolean;
}

export function AddPromptModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: AddPromptProps) {
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [topics, setTopics] = useState<string>("");

  const handleNext = () => {
    if (step === 0 && prompt.trim().length > 0) {
      setStep(1);
    }
  };

  const handleBack = () => {
    if (step === 1) setStep(0);
  };

  const handleSubmit = () => {
    if (prompt.trim().length === 0) return;
    onSubmit({ prompt, topics: topics.trim() ? topics : undefined });
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
            {step === 0
              ? "Describe the context of the form you want to create. Be as specific as possible."
              : "Add important questions or topics (optional)"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {step === 0 && (
            <Textarea
              placeholder="For example: A customer satisfaction survey for an e-commerce website that sells electronics"
              className="min-h-[150px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          )}
          {step === 1 && (
            <div className="space-y-4">
              <Textarea
                placeholder={
                  "List key topics or questions if you want (one per line):\n- Product quality\n- Customer service"
                }
                className="min-h-[150px]"
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                disabled={isLoading}
                autoFocus
              />
              <div className="bg-primary-50 border border-primary-100 rounded-md p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-primary-700">
                    Adding key topics helps create more focused questions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {step === 0 ? (
            <Button
              onClick={handleNext}
              disabled={isLoading || prompt.trim().length === 0}
            >
              Continue
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isLoading}
                type="button"
              >
                Previous
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || prompt.trim().length === 0}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating form...
                  </>
                ) : (
                  "Generate form"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
