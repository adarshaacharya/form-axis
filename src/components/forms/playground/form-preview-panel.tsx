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

interface FormPreviewPanelProps {
  form: any;
  formFields: any[];
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
            See how your form will appear to respondents
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
