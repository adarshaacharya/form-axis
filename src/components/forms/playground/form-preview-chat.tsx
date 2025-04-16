"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { MessageItem } from "./message-item";
import { ChatInput } from "./chat-input";
import { FormWelcome } from "./form-welcome";
import { FormCompletion } from "./form-completion";
import { FormField } from "@/lib/types";
import { formatChatDate } from "./utils/utils";

interface Message {
  id: string;
  source: "system" | "user" | "thinking";
  content: string | React.ReactNode;
}

interface FormPreviewChatProps {
  title: string;
  description: string;
  fields: FormField[];
  onComplete?: (answers: Record<string, string>) => void;
  fullscreen?: boolean;
  onProgressChange?: (progress: number) => void;
}

export function FormPreviewChat({
  title,
  description,
  fields,
  onComplete,
  fullscreen = false,
  onProgressChange,
}: FormPreviewChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isThinking, setIsThinking] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  const scrollRef = useScrollToBottom([messages]);

  useEffect(() => {
    if (!showWelcome) {
      const initialMessages: Message[] = [
        {
          id: "intro",
          source: "system",
          content: (
            <div className="space-y-2">
              <h3 className="font-medium text-lg">{title}</h3>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
              <p>
                Please answer the following {fields.length} question
                {fields.length !== 1 ? "s" : ""}. Let&apos;s begin!
              </p>
            </div>
          ),
        },
      ];

      if (fields.length > 0) {
        initialMessages.push({
          ...createFieldMessage(fields[0]),
          source: "system",
        });
      }

      setMessages(initialMessages);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [title, description, fields, showWelcome, scrollRef]);

  useEffect(() => {
    if (fields.length === 0) return;

    const progressValue = Math.round((currentFieldIndex / fields.length) * 100);
    onProgressChange?.(progressValue);

    if (isCompleted) {
      onProgressChange?.(100);
    }
  }, [currentFieldIndex, fields.length, isCompleted, onProgressChange]);

  const createFieldMessage = (field: FormField) => {
    return {
      id: `field-${field._id}`,
      source: "system",
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

  const handleSubmitAnswer = (userInput: string) => {
    if (currentFieldIndex >= fields.length) return;

    const currentField = fields[currentFieldIndex];

    // Format date if the field is a calendar field
    let displayValue = userInput;
    if (currentField.type === "calendar" && userInput) {
      displayValue = formatChatDate(userInput);
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `answer-${currentField._id}`,
        source: "user",
        content: displayValue, // Use the formatted display value
      },
    ]);

    // Still store the original ISO string in answers for database submission
    setAnswers((prev) => ({
      ...prev,
      [currentField._id as string]: userInput,
    }));

    setIsThinking(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `thinking-${Date.now()}`,
        source: "thinking",
        content: "",
      },
    ]);

    const nextIndex = currentFieldIndex + 1;

    setTimeout(() => {
      setIsThinking(false);

      setMessages((prev) => prev.filter((m) => m.source !== "thinking"));

      if (nextIndex < fields.length) {
        setCurrentFieldIndex(nextIndex);

        setMessages((prev) => [
          ...prev,
          { ...createFieldMessage(fields[nextIndex]), source: "system" },
        ]);
      } else {
        setIsCompleted(true);

        if (onComplete) {
          onComplete(answers);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: "completion",
            source: "system",
            content: (
              <div className="space-y-2">
                <p className="font-medium">
                  Thank you for completing this form!
                </p>
                <p>Your responses have been recorded.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  You will see a summary screen in a moment...
                </p>
              </div>
            ),
          },
        ]);

        setTimeout(() => {
          setShowCompletionScreen(true);
        }, 2000);
      }
    }, 1000);
  };

  const currentField = fields[currentFieldIndex];

  const handleStartForm = () => {
    setShowWelcome(false);
  };

  const handleReturnHome = () => {
    if (window.parent !== window) {
      try {
        window.parent.postMessage({ type: "FORM_COMPLETED" }, "*");
      } catch (e) {
        console.error("Failed to notify parent window", e);
      }
    }

    window.location.href = "/";
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
      ) : showCompletionScreen ? (
        <FormCompletion
          onViewAnswers={handleReturnHome}
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
                  source={message.source}
                  content={message.content}
                />
              ))}
            </AnimatePresence>
          </div>

          {!isCompleted && currentField && (
            <div className="border-t border-border/30 py-3 px-4">
              <ChatInput
                currentField={currentField}
                currentFieldIndex={currentFieldIndex}
                fieldsCount={fields.length}
                onSubmit={handleSubmitAnswer}
                isThinking={isThinking}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
