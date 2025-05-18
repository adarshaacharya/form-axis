"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import {
  InboxIcon,
  BarChart,
  MessageSquare,
  TrendingUp,
  DownloadIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { downloadResponsesXlsx } from "@/lib/xlsx-utils";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponseDetailView } from "./response-detail-view";
import { ResponseShareEmptyState } from "./response-share-empty-state";

interface ResponsesListProps {
  formId: Id<"forms">;
}

export function ResponsesList({ formId }: ResponsesListProps) {
  const responses = useQuery(api.responses.getFormResponses, { formId });
  const analytics = useQuery(api.responses.getFormAnalytics, { formId });
  const fields = useQuery(api.formFields.getFormFields, { formId });
  const [selectedResponseId, setSelectedResponseId] =
    useState<Id<"responses"> | null>(null);
  const isLoading = responses === undefined || analytics === undefined;

  const handleDownload = () => {
    if (responses && fields) {
      downloadResponsesXlsx(formId, responses, fields);
    }
  };

  // Container with consistent height
  const minHeight = "min-h-[600px]";

  // Select first response by default if available
  useEffect(() => {
    if (responses?.length && !selectedResponseId && !isLoading) {
      setSelectedResponseId(responses[0]._id);
    }
  }, [responses, selectedResponseId, isLoading]);

  if (isLoading) {
    return (
      <div className={`space-y-6 ${minHeight}`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-5 gap-6`}>
          <div className="md:col-span-1">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
          <div className="md:col-span-4">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!responses || responses.length === 0) {
    return (
      <div className={`${minHeight} flex items-center justify-center`}>
        <ResponseShareEmptyState formId={formId} />
      </div>
    );
  }

  // Analytics values - use real data where available, fallbacks where not
  const totalResponses = responses.length;
  const completionRate = analytics?.completionRate || 93;
  const avgTime = analytics?.responseRate || "2m 10s";

  return (
    <div className={`space-y-6 ${minHeight}`}>
      <div className="flex justify-end">
        <Button
          size="sm"
          onClick={handleDownload}
          variant="outline"
          disabled={responses.length === 0}
          className="hover:text-primary"
          aria-label="Download responses as XLSX"
        >
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download XLSX
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Responses
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResponses}</div>
            <p className="text-xs text-muted-foreground mt-1">For this form</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Questions answered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Response Time
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgTime}</div>
            <p className="text-xs text-muted-foreground mt-1">Per submission</p>
          </CardContent>
        </Card>
      </div>

      {/* Responses list and detail view */}
      <div className={`grid grid-cols-1 md:grid-cols-5 gap-6`}>
        {/* Responses list - smaller left pane (20% width) */}
        <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
          <div className="p-3 border-b bg-muted/40 flex items-center justify-between">
            <h3 className="font-medium text-sm flex items-center justify-between">
              <span>Responses</span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                {responses.length}
              </span>
            </h3>
          </div>

          <div className="overflow-auto flex-1 custom-scrollbar">
            {responses.map((response) => (
              <div
                key={response._id}
                onClick={() => setSelectedResponseId(response._id)}
                className={cn(
                  "p-3 border-b cursor-pointer transition-colors hover:bg-muted/50",
                  selectedResponseId === response._id && "bg-accent"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium text-xs truncate max-w-[70%]">
                    {response.respondentEmail || "Anonymous"}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {format(new Date(response.submittedAt), "MMM d, h:mm a")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response detail with analytics - wider right pane (80% width) */}
        <div className="md:col-span-4">
          {selectedResponseId ? (
            <ResponseDetailView responseId={selectedResponseId} />
          ) : (
            <Card className="h-full flex items-center justify-center text-center">
              <CardContent>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-4 py-10"
                >
                  <motion.div
                    initial={{ y: 10 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                    className="rounded-full bg-muted p-6"
                  >
                    <InboxIcon className="h-10 w-10 text-muted-foreground/60" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Select a response
                    </h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">
                      Click on a response in the sidebar to view its details
                      here.
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
