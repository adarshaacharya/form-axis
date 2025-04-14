"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  currentField: any;
  currentFieldIndex: number;
  fieldsCount: number;
  onSubmit: (value: string) => void;
}

export function ChatInput({
  currentField,
  currentFieldIndex,
  fieldsCount,
  onSubmit,
}: ChatInputProps) {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = () => {
    if (!userInput.trim() && currentField?.required) return;
    onSubmit(userInput);
    setUserInput("");
  };

  if (!currentField) return null;

  return (
    <div className="border-t p-3">
      <div className="flex items-center gap-2">
        {currentField.type === "shortText" && (
          <Input
            placeholder={currentField.placeholder || "Type your answer..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 rounded-full border-muted-foreground/20 h-12 px-4 text-base"
          />
        )}

        {currentField.type === "longText" && (
          <Textarea
            placeholder={currentField.placeholder || "Type your answer..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={4}
            className="flex-1 border-muted-foreground/20 rounded-2xl p-4 text-base resize-none"
          />
        )}

        {currentField.type === "number" && (
          <Input
            type="number"
            placeholder={currentField.placeholder || "Enter a number..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            min={currentField.validation?.min}
            max={currentField.validation?.max}
            className="flex-1 rounded-full border-muted-foreground/20 h-12 px-4 text-base"
          />
        )}

        {currentField.type === "email" && (
          <Input
            type="email"
            placeholder={currentField.placeholder || "Enter your email..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 rounded-full border-muted-foreground/20 h-12 px-4 text-base"
          />
        )}

        {currentField.type === "phone" && (
          <Input
            type="tel"
            placeholder={
              currentField.placeholder || "Enter your phone number..."
            }
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 rounded-full border-muted-foreground/20 h-12 px-4 text-base"
          />
        )}

        {currentField.type === "time" && (
          <Input
            type="datetime-local"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1 rounded-full border-muted-foreground/20 h-12 px-4 text-base"
          />
        )}

        <Button
          onClick={handleSubmit}
          disabled={!userInput.trim() && currentField.required}
          className="rounded-full w-10 h-10 p-0 flex items-center justify-center flex-shrink-0"
          size="icon"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">
            {currentFieldIndex === fieldsCount - 1 ? "Submit" : "Next"}
          </span>
        </Button>
      </div>
    </div>
  );
}
