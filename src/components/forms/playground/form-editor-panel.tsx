"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormFieldsEditor } from "./form-fields-editor";
import { FormSettingsEditor } from "./form-settings-editor";

interface FormEditorPanelProps {
  form: any;
  formFields: any[];
  activeTab: "fields" | "settings";
  formId: Id<"forms">;
}

export function FormEditorPanel({
  form,
  formFields,
  activeTab,
  formId,
}: FormEditorPanelProps) {
  const updateForm = useMutation(api.forms.updateForm);
  const updateFormField = useMutation(api.formFields.updateFormField);
  const createFormField = useMutation(api.formFields.createFormField);
  const deleteFormField = useMutation(api.formFields.deleteFormField);

  // Handle form settings update
  const handleUpdateSettings = async (settings: any) => {
    try {
      await updateForm({
        formId,
        title: settings.title,
        description: settings.description,
        isPublished: settings.isPublished,
        settings: settings.settings,
      });
      toast.success("Form settings updated");
    } catch (error) {
      console.error("Error updating form settings:", error);
      toast.error("Failed to update form settings");
    }
  };

  // Handle create form field
  const handleCreateField = async (field: any) => {
    try {
      await createFormField({
        formId,
        order: field.order,
        type: field.type,
        label: field.label,
        required: field.required,
        placeholder: field.placeholder,
        description: field.description,
        validation: field.validation,
      });
      toast.success("Field created");
    } catch (error) {
      console.error("Error creating field:", error);
      toast.error("Failed to create field");
    }
  };

  // Handle update form field
  const handleUpdateField = async (field: any) => {
    try {
      await updateFormField({
        fieldId: field._id,
        order: field.order,
        type: field.type,
        label: field.label,
        required: field.required,
        placeholder: field.placeholder,
        description: field.description,
        validation: field.validation,
      });
      toast.success("Field updated");
    } catch (error) {
      console.error("Error updating field:", error);
      toast.error("Failed to update field");
    }
  };

  // Handle delete form field
  const handleDeleteField = async (fieldId: Id<"formFields">) => {
    try {
      await deleteFormField({ fieldId });
      toast.success("Field deleted");
    } catch (error) {
      console.error("Error deleting field:", error);
      toast.error("Failed to delete field");
    }
  };

  return (
    <Card className="h-[650px] flex flex-col shadow-sm">
      {activeTab === "fields" ? (
        <>
          <CardHeader className="pb-2">
            <CardTitle>Form Fields</CardTitle>
            <CardDescription>
              Manage your form's fields and questions
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pb-6 custom-scrollbar">
            <FormFieldsEditor
              formId={formId}
              fields={formFields}
              onCreateField={handleCreateField}
              onUpdateField={handleUpdateField}
              onDeleteField={handleDeleteField}
            />
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="pb-2">
            <CardTitle>Form Settings</CardTitle>
            <CardDescription>
              Configure your form's basic settings
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pb-6 custom-scrollbar">
            <FormSettingsEditor form={form} onUpdate={handleUpdateSettings} />
          </CardContent>
        </>
      )}
    </Card>
  );
}
