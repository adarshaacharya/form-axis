"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { MessageItem } from "./message-item";
import { ChatInput } from "./chat-input";
import { FormWelcome } from "./form-welcome";

interface Message {
  id: string;
  type: "system" | "user" | "thinking";
  content: string | React.ReactNode;
}

interface FormPreviewChatProps {
  title: string;
  description: string;
  fields: any[];
  onComplete?: (answers: Record<string, string>) => void;
  fullscreen?: boolean;
}

export function FormPreviewChat({
  title,
  description,
  fields,
  onComplete,
  fullscreen = false,
}: FormPreviewChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isThinking, setIsThinking] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Use our custom hook to automatically scroll to bottom when messages change
  const scrollRef = useScrollToBottom([messages]);

  // Initialize chat with form introduction
  useEffect(() => {
    if (!showWelcome) {
      const initialMessages: Message[] = [
        {
          id: "intro",
          type: "system",
          content: (
            <div className="space-y-2">
              <h3 className="font-medium text-lg">{title}</h3>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
              <p>Please answer the following questions. Let's begin!</p>
            </div>
          ),
        },
      ];

      // Only add first question if there are fields
      if (fields.length > 0) {
        initialMessages.push(createFieldMessage(fields[0]));
      }

      setMessages(initialMessages);
    }
  }, [title, description, fields, showWelcome]);

  // Create field message
  const createFieldMessage = (field: any) => {
    return {
      id: `field-${field._id}`,
      type: "system",
      content: (
        <div>
          <p>{field.label}</p>
          {field.description && (
            <p className="text-muted-foreground text-sm mt-1">
              {field.description}
            </p>
          )}
        </div>
      ),
    };
  };

  // Handle submit answer
  const handleSubmitAnswer = (userInput: string) => {
    if (currentFieldIndex >= fields.length) return;

    const currentField = fields[currentFieldIndex];

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `answer-${currentField._id}`,
        type: "user",
        content: userInput,
      },
    ]);

    // Store answer
    setAnswers((prev) => ({
      ...prev,
      [currentField._id as string]: userInput,
    }));

    // Show thinking state
    setIsThinking(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `thinking-${Date.now()}`,
        type: "thinking",
        content: "",
      },
    ]);

    // Move to next field or finish
    const nextIndex = currentFieldIndex + 1;

    setTimeout(() => {
      setIsThinking(false);

      // Remove thinking message
      setMessages((prev) => prev.filter((m) => m.type !== "thinking"));

      if (nextIndex < fields.length) {
        setCurrentFieldIndex(nextIndex);

        // Add next field message
        setMessages((prev) => [...prev, createFieldMessage(fields[nextIndex])]);
      } else {
        setIsCompleted(true);

        // Call onComplete if provided
        if (onComplete) {
          onComplete(answers);
        }

        // Show completion message
        setMessages((prev) => [
          ...prev,
          {
            id: "completion",
            type: "system",
            content: (
              <div className="space-y-2">
                <p className="font-medium">
                  Thank you for completing this form!
                </p>
                <p>Your responses have been recorded.</p>
              </div>
            ),
          },
        ]);
      }
    }, 1000); // Thinking state for 1 second
  };

  // Get current field
  const currentField = fields[currentFieldIndex];

  // Handle start form
  const handleStartForm = () => {
    setShowWelcome(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {showWelcome ? (
        <FormWelcome
          title={title}
          description={description}
          onStart={handleStartForm}
          fullscreen={fullscreen}
        />
      ) : (
        <div className="flex flex-col h-full overflow-hidden">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
          >
            <AnimatePresence>
              {messages.map((message) => (
                <MessageItem
                  key={message.id}
                  type={message.type}
                  content={message.content}
                />
              ))}
            </AnimatePresence>
          </div>

          {!isCompleted && currentField && (
            <div className="border-t border-border/30 py-3 px-4 ">
              <ChatInput
                currentField={currentField}
                currentFieldIndex={currentFieldIndex}
                fieldsCount={fields.length}
                onSubmit={handleSubmitAnswer}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
