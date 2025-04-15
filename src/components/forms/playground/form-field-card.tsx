"use client";

import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Save,
  Trash,
  X,
} from "lucide-react";
import { FormField, FormFieldType } from "@/lib/types";

interface FormFieldCardProps {
  field: FormField;
  isEditing: boolean;
  onToggleEdit: () => void;
  onUpdate: (field: FormField) => Promise<void>;
  onDelete: (fieldId: Id<"formFields">) => Promise<void>;
}

export function FormFieldCard({
  field,
  isEditing,
  onToggleEdit,
  onUpdate,
  onDelete,
}: FormFieldCardProps) {
  const [editedField, setEditedField] = useState<FormField>(field);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSave = async () => {
    if (!editedField._id) return;
    try {
      setIsSaving(true);
      await onUpdate(editedField);
      onToggleEdit();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!field._id) return;
    await onDelete(field._id);
  };

  const fieldTypeLabels: Record<FormFieldType, string> = {
    shortText: "Short Text",
    longText: "Long Text",
    number: "Number",
    email: "Email",
    phone: "Phone",
    calendar: "Calendar",
  };

  const needsValidation = ["shortText", "longText", "number"].includes(
    editedField.type
  );

  return (
    <>
      <Card className={`${isEditing ? "border-primary" : ""}`}>
        <CardHeader
          className="flex flex-row items-center justify-between  cursor-pointer"
          onClick={!isEditing ? onToggleEdit : undefined}
        >
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
            <div>
              <span className="text-sm font-medium">
                {field.order + 1}. {field.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={field.required ? "default" : "outline"}>
              {field.required ? "Required" : "Optional"}
            </Badge>
            <Badge variant="secondary">
              {fieldTypeLabels[field.type] || field.type}
            </Badge>
            {isEditing ? (
              <ChevronUp
                className="h-5 w-5 text-muted-foreground"
                onClick={onToggleEdit}
              />
            ) : (
              <ChevronDown
                className="h-5 w-5 text-muted-foreground"
                onClick={onToggleEdit}
              />
            )}
          </div>
        </CardHeader>

        {isEditing && (
          <CardContent className="p-4 pt-0">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor={`label-${field._id}`}>Question Text</Label>
                <Input
                  id={`label-${field._id}`}
                  value={editedField.label}
                  onChange={(e) =>
                    setEditedField({ ...editedField, label: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${field._id}`}>
                  Description (Optional)
                </Label>
                <Textarea
                  id={`description-${field._id}`}
                  value={editedField.description || ""}
                  onChange={(e) =>
                    setEditedField({
                      ...editedField,
                      description: e.target.value,
                    })
                  }
                  placeholder="Add helpful instructions for this question"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`type-${field._id}`}>Field Type</Label>
                  <Select
                    value={editedField.type}
                    onValueChange={(value: FormFieldType) =>
                      setEditedField({ ...editedField, type: value })
                    }
                  >
                    <SelectTrigger id={`type-${field._id}`}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shortText">Short Text</SelectItem>
                      <SelectItem value="longText">Long Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="calendar">Calendar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`placeholder-${field._id}`}>
                    Placeholder
                  </Label>
                  <Input
                    id={`placeholder-${field._id}`}
                    value={editedField.placeholder || ""}
                    onChange={(e) =>
                      setEditedField({
                        ...editedField,
                        placeholder: e.target.value,
                      })
                    }
                    placeholder="Enter placeholder text"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id={`required-${field._id}`}
                  checked={editedField.required}
                  onCheckedChange={(checked) =>
                    setEditedField({ ...editedField, required: checked })
                  }
                />
                <Label htmlFor={`required-${field._id}`}>Required field</Label>
              </div>

              {needsValidation && (
                <div className="border rounded-md p-4 space-y-4">
                  <h4 className="text-sm font-medium">Validation Options</h4>
                  {editedField.type === "number" ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`min-${field._id}`}>
                          Minimum Value
                        </Label>
                        <Input
                          id={`min-${field._id}`}
                          type="number"
                          value={editedField.validation?.min ?? ""}
                          onChange={(e) =>
                            setEditedField({
                              ...editedField,
                              validation: {
                                ...editedField.validation,
                                min: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              },
                            })
                          }
                          placeholder="No minimum"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`max-${field._id}`}>
                          Maximum Value
                        </Label>
                        <Input
                          id={`max-${field._id}`}
                          type="number"
                          value={editedField.validation?.max ?? ""}
                          onChange={(e) =>
                            setEditedField({
                              ...editedField,
                              validation: {
                                ...editedField.validation,
                                max: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              },
                            })
                          }
                          placeholder="No maximum"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`minLength-${field._id}`}>
                          Min Length
                        </Label>
                        <Input
                          id={`minLength-${field._id}`}
                          type="number"
                          value={editedField.validation?.minLength ?? ""}
                          onChange={(e) =>
                            setEditedField({
                              ...editedField,
                              validation: {
                                ...editedField.validation,
                                minLength: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              },
                            })
                          }
                          placeholder="No minimum"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`maxLength-${field._id}`}>
                          Max Length
                        </Label>
                        <Input
                          id={`maxLength-${field._id}`}
                          type="number"
                          value={editedField.validation?.maxLength ?? ""}
                          onChange={(e) =>
                            setEditedField({
                              ...editedField,
                              validation: {
                                ...editedField.validation,
                                maxLength: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              },
                            })
                          }
                          placeholder="No maximum"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  type="button"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onToggleEdit}
                    type="button"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                    type="button"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </CardContent>
        )}
      </Card>

      <ConfirmDialog
        title="Delete Form Field"
        description="Are you sure you want to delete this field? This action cannot be undone."
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
