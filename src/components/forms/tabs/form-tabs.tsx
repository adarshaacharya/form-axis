"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormEditorPanel } from "@/components/forms/playground/form-editor-panel";
import { FormPreviewPanel } from "@/components/forms/playground/form-preview-panel";
import { ResponsesList } from "@/components/forms/responses/responses-list";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { Form, FormField } from "@/lib/types";

interface FormTabsProps {
  form: Form;
  formFields: FormField[];
  formId: Id<"forms">;
}

const FORM_TABS = [
  {
    label: "Form Fields",
    value: "fields",
  },
  {
    label: "Form Settings",
    value: "settings",
  },
  {
    label: "Responses",
    value: "responses",
  },
];

export function FormTabs({ form, formFields, formId }: FormTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "fields" | "settings" | "responses"
  >("fields");

  // The main container has a consistent height to prevent layout shift
  const tabContentContainerClass = "min-h-[600px]";

  return (
    <div className="space-y-8">
      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "fields" | "settings" | "responses")
        }
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full">
          {FORM_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-sm font-medium"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          <TabsContent
            value="fields"
            className={`mt-0 ${tabContentContainerClass}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormEditorPanel
                form={form}
                formFields={formFields}
                activeTab="fields"
                formId={formId}
              />
              <FormPreviewPanel form={form} formFields={formFields} />
            </div>
          </TabsContent>

          <TabsContent
            value="settings"
            className={`mt-0 ${tabContentContainerClass}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormEditorPanel
                form={form}
                formFields={formFields}
                activeTab="settings"
                formId={formId}
              />
              <FormPreviewPanel form={form} formFields={formFields} />
            </div>
          </TabsContent>

          <TabsContent
            value="responses"
            className={`mt-0 ${tabContentContainerClass}`}
          >
            <ResponsesList formId={formId} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
