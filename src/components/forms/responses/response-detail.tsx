"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { format } from "date-fns";
import { motion } from "motion/react";
import { User, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface ResponseDetailProps {
  responseId: Id<"responses">;
}

export function ResponseDetail({ responseId }: ResponseDetailProps) {
  const responseDetails = useQuery(api.responses.getResponseDetails, {
    responseId,
  });

  const isLoading = responseDetails === undefined;

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-4">
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!responseDetails) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">Response not found</p>
        </CardContent>
      </Card>
    );
  }

  const submittedDate = new Date(responseDetails.submittedAt);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center mb-2">
          <CardTitle>Response Details</CardTitle>
          <Badge variant="outline">
            {format(submittedDate, "MMM d, yyyy")}
          </Badge>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{responseDetails.respondentEmail || "Anonymous"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{format(submittedDate, "h:mm a")}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {responseDetails.enhancedAnswers.map((answer, index) => (
          <motion.div
            key={answer.fieldId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-2"
          >
            <h3 className="font-medium text-sm">{answer.fieldLabel}</h3>
            <div className="p-3 bg-muted rounded-md">
              {answer.value || (
                <span className="text-muted-foreground italic">
                  No answer provided
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
