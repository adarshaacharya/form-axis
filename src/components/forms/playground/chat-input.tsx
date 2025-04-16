"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/lib/types";
import { Calendar as CalendarIcon, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  currentField: FormField;
  currentFieldIndex: number;
  fieldsCount: number;
  onSubmit: (value: string) => void;
  isThinking: boolean;
}

export function ChatInput({
  currentField,
  currentFieldIndex,
  fieldsCount,
  onSubmit,
  isThinking,
}: ChatInputProps) {
  const [userInput, setUserInput] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Create refs for different input types
  const shortTextRef = useRef<HTMLInputElement>(null);
  const longTextRef = useRef<HTMLTextAreaElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const calendarButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the appropriate input element when the component mounts or when the field changes
  useEffect(() => {
    if (isThinking) return;

    // Small delay to ensure the DOM is ready
    const timeoutId = setTimeout(() => {
      if (currentField.type === "shortText" && shortTextRef.current) {
        shortTextRef.current.focus();
      } else if (currentField.type === "longText" && longTextRef.current) {
        longTextRef.current.focus();
      } else if (currentField.type === "number" && numberRef.current) {
        numberRef.current.focus();
      } else if (currentField.type === "email" && emailRef.current) {
        emailRef.current.focus();
      } else if (currentField.type === "phone" && phoneRef.current) {
        phoneRef.current.focus();
      } else if (
        currentField.type === "calendar" &&
        calendarButtonRef.current
      ) {
        calendarButtonRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [currentField.type, isThinking, currentFieldIndex]);

  const handleSubmit = () => {
    if (
      (!userInput.trim() &&
        currentField?.required &&
        currentField.type !== "calendar") ||
      (currentField.type === "calendar" && !date && currentField.required)
    )
      return;

    // For calendar, send the ISO date string
    if (currentField.type === "calendar" && date) {
      onSubmit(date.toISOString());
    } else {
      onSubmit(userInput);
    }

    // Reset both input states
    setUserInput("");
    setDate(undefined);
    setIsCalendarOpen(false);
  };

  if (!currentField) return null;

  return (
    <div className="p-3">
      <div className="flex items-center gap-2">
        {currentField.type === "shortText" && (
          <Input
            ref={shortTextRef}
            placeholder={currentField.placeholder || "Type your answer..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 rounded-full border-muted-foreground/20 h-12 px-4 text-base"
            disabled={isThinking}
            autoComplete="off"
            autoCorrect="off"
          />
        )}

        {currentField.type === "longText" && (
          <Textarea
            ref={longTextRef}
            placeholder={currentField.placeholder || "Type your answer..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            rows={4}
            className="flex-1 border-muted-foreground/20 rounded-2xl p-4 text-base resize-none"
            disabled={isThinking}
          />
        )}

        {currentField.type === "number" && (
          <Input
            ref={numberRef}
            type="number"
            placeholder={currentField.placeholder || "Enter a number..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            min={currentField.validation?.min}
            max={currentField.validation?.max}
            className="flex-1 rounded-full border-muted-foreground/20 h-12 px-4 text-base"
            disabled={isThinking}
          />
        )}

        {currentField.type === "email" && (
          <Input
            ref={emailRef}
            type="email"
            placeholder={currentField.placeholder || "Enter your email..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 rounded-full border-muted-foreground/20 h-12 px-4 text-base"
            disabled={isThinking}
          />
        )}

        {currentField.type === "phone" && (
          <Input
            ref={phoneRef}
            type="tel"
            placeholder={
              currentField.placeholder || "Enter your phone number..."
            }
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 rounded-full border-muted-foreground/20 h-12 px-4 text-base"
            disabled={isThinking}
          />
        )}

        {currentField.type === "calendar" && (
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                ref={calendarButtonRef}
                variant="outline"
                className={cn(
                  "flex-1 h-12 justify-start text-left font-normal rounded-full border-muted-foreground/20",
                  !date && "text-muted-foreground"
                )}
                disabled={isThinking}
                onClick={() => setIsCalendarOpen(true)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date
                  ? format(date, "PPP")
                  : currentField.placeholder || "Pick a date..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  // Auto-close calendar after selection
                  if (newDate) {
                    setTimeout(() => {
                      setIsCalendarOpen(false);
                      // Focus submit button after selection
                      setTimeout(() => {
                        const submitButton = document.querySelector(
                          'button[size="icon"]'
                        );
                        if (submitButton instanceof HTMLElement) {
                          submitButton.focus();
                        }
                      }, 100);
                    }, 300);
                  }
                }}
                initialFocus
                disabled={isThinking}
              />
            </PopoverContent>
          </Popover>
        )}

        <Button
          onClick={handleSubmit}
          disabled={
            (!userInput.trim() &&
              currentField.type !== "calendar" &&
              currentField.required) ||
            (currentField.type === "calendar" &&
              !date &&
              currentField.required) ||
            isThinking
          }
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
