"use client";

import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormCompletionProps {
  onViewAnswers: () => void;
  fullscreen?: boolean;
}

export function FormCompletion({
  onViewAnswers,
  fullscreen = false,
}: FormCompletionProps) {
  return (
    <div
      className={`flex justify-center items-center w-full ${fullscreen ? "min-h-screen" : "h-full"} bg-background p-4`}
    >
      <motion.div
        className="w-full max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-2">
            <motion.div
              className="mx-auto mb-6 bg-primary/10 p-5 rounded-full w-20 h-20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="h-10 w-10 text-primary" />
            </motion.div>

            <CardTitle className="text-2xl sm:text-3xl font-bold">
              Thank You!
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Your response has been recorded successfully.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 text-center">
            <p className="text-muted-foreground">
              Thanks for completing this form. Your feedback is valuable!
            </p>
          </CardContent>

          <CardFooter className="flex justify-center pt-2">
            <Button onClick={onViewAnswers} variant="default" className="px-6">
              Return to Home
            </Button>

            <Button
              variant="outline"
              className="ml-4 px-6"
              onClick={() => window.location.reload()}
            >
              Refill Form
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
