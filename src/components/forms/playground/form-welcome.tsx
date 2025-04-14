"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FormWelcomeProps {
  title: string;
  description: string;
  onStart: () => void;
}

export function FormWelcome({ title, description, onStart }: FormWelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full animate-pulse" />
          <div className="absolute w-16 h-16 top-4 left-4 bg-gradient-to-br from-primary to-purple-500 rounded-full shadow-lg" />
          <motion.div
            className="absolute w-4 h-4 bg-yellow-300 rounded-full shadow-md"
            animate={{
              x: [0, 20, 0],
              y: [0, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            style={{ top: "8px", left: "6px" }}
          />
          <motion.div
            className="absolute w-3 h-3 bg-cyan-300 rounded-full shadow-sm"
            animate={{
              x: [0, -8, 0],
              y: [0, 12, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{ bottom: "8px", right: "10px" }}
          />
        </div>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="text-muted-foreground mb-8 max-w-md"
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
        <Button onClick={onStart} className="rounded-full px-6" size="lg">
          Start Form
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
