"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormPreviewChat } from "./form-preview-chat";
import { motion } from "motion/react";
import Link from "next/link";
import { Form, FormField } from "@/lib/types";

interface FormPreviewPanelProps {
  form: Form;
  formFields: FormField[];
}

export function FormPreviewPanel({ form, formFields }: FormPreviewPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-[650px] flex flex-col pb-0">
        <CardHeader className="pb-2 border-b">
          <CardTitle>Form Preview</CardTitle>
          <CardDescription>
            See how your form will appear to respondents. Enter{" "}
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/forms/${form._id}/preview`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              full-screen preview mode
            </Link>{" "}
            for a better experience. Responses are not saved in preview mode.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-hidden">
          <div className="h-full overflow-hidden flex flex-col">
            <FormPreviewChat
              title={form.title}
              description={form.description || ""}
              fields={formFields}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
