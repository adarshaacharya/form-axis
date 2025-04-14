"use client";

import { motion } from "motion/react";
import { FileQuestion, AlertCircle, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlankPageProps {
  title: string;
  description: string;
  errorType?: "not-found" | "error";
}

export const BlankPage = ({
  title,
  description,
  errorType = "not-found",
}: BlankPageProps) => {
  const Icon = errorType === "error" ? AlertCircle : FileQuestion;
  const iconColor =
    errorType === "error" ? "text-red-500/70" : "text-muted-foreground/60";

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center"
      >
        <motion.div
          initial={{ y: 10 }}
          animate={{
            y: [0, -10, 0],
            rotate: errorType === "error" ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="mx-auto mb-6 flex justify-center"
        >
          <Icon className={`h-24 w-24 ${iconColor}`} />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold mb-3"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-muted-foreground text-center max-w-md mx-auto mb-6"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/">
            <Button className="gap-2">
              <Home size={16} />
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
