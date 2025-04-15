"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FormWelcomeProps {
  title: string;
  description: string;
  onStart: () => void;
  fullscreen?: boolean;
}

export function FormWelcome({
  title,
  description,
  onStart,
  fullscreen = false,
}: FormWelcomeProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${fullscreen ? "h-screen" : "h-full"} p-6 text-center`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full animate-pulse" />
          <div className="absolute w-20 h-20 top-4 left-4 bg-gradient-to-br from-primary to-purple-500 rounded-full shadow-lg" />
          <motion.div
            className="absolute w-5 h-5 bg-yellow-300 rounded-full shadow-md"
            animate={{
              x: [0, 25, 0],
              y: [0, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            style={{ top: "10px", left: "8px" }}
          />
          <motion.div
            className="absolute w-4 h-4 bg-cyan-300 rounded-full shadow-sm"
            animate={{
              x: [0, -12, 0],
              y: [0, 18, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{ bottom: "10px", right: "12px" }}
          />
        </div>
      </motion.div>

      <motion.h1
        className={`${fullscreen ? "text-4xl md:text-5xl" : "text-2xl"} font-bold mb-4`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {title}
      </motion.h1>

      <motion.p
        className="text-muted-foreground mb-10 max-w-lg text-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {description ||
          "Please answer the following questions to complete this form."}
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Button
          onClick={onStart}
          className={`rounded-full px-8 ${fullscreen ? "text-lg h-14 px-10" : ""}`}
          size={fullscreen ? "lg" : "default"}
        >
          Start Form
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}
