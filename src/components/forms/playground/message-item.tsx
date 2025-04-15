"use client";

import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface MessageItemProps {
  source: "system" | "user" | "thinking";
  content: React.ReactNode;
}

export function MessageItem({ source, content }: MessageItemProps) {
  const isUser = source === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse ml-auto" : ""}`}
    >
      {source === "system" || source === "thinking" ? (
        <Avatar className="h-8 w-8 mt-0.5 border bg-primary/10">
            <AvatarFallback className="text-primary text-xs font-medium">
            <Bot className="h-4 w-4" />
            </AvatarFallback>
          <AvatarImage>
            <Bot className="h-4 w-4 text-primary" />
          </AvatarImage>
        </Avatar>
      ) : (
        <Avatar className="h-8 w-8 mt-0.5 bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md">
          <AvatarFallback className="text-primary-foreground text-xs font-medium">
            <User className="h-4 w-4 text-white" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={`rounded-lg p-3 ${
          isUser
            ? "bg-primary text-primary-foreground max-w-[80%]"
            : source === "thinking"
              ? "bg-muted/50 text-foreground max-w-[80%]"
              : "bg-muted text-foreground max-w-[80%]"
        }`}
      >
        {source === "thinking" ? (
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse"
              style={{ animationDelay: "300ms" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse"
              style={{ animationDelay: "600ms" }}
            ></div>
          </div>
        ) : (
          content
        )}
      </div>
    </motion.div>
  );
}
