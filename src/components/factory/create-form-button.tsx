"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PromptModal } from "./prompt-modal";

export default function CreateFormButton() {
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPrompt = async (prompt: string) => {
    try {
      setIsLoading(true);
      // Here you would call your Convex mutation to create a form based on the prompt
      console.log("Creating form with prompt:", prompt);
      // Wait for form creation (simulating API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // After successful creation, close the modal
      setShowPromptModal(false);
    } catch (error) {
      console.error("Error creating form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setShowPromptModal(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Create Form
      </Button>

      <PromptModal
        open={showPromptModal}
        onOpenChange={setShowPromptModal}
        onSubmit={handleSubmitPrompt}
        isLoading={isLoading}
      />
    </>
  );
}
