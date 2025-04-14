"use client";

import * as React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { CopyIcon, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import CreateFormButton from "@/components/prompt-dialog/create-form-button";

// Define the form type based on your schema
interface Form {
  _id: Id<"forms">;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublished: boolean;
  settings?: {
    allowAnonymous: boolean;
    collectEmail: boolean;
    maxResponses?: number;
    expiresAt?: string;
  };
  responseCount?: number;
}

export function FormsTable() {
  const forms = useQuery(api.forms.listForms) || [];
  const deleteForm = useMutation(api.forms.deleteForm);
  const router = useRouter();

  const copyShareLink = (formId: Id<"forms">) => {
    const shareLink = `${window.location.origin}/forms/${formId}`;
    navigator.clipboard.writeText(shareLink);
    toast.success("Share link copied to clipboard!", {
      description: "You can now share this link with others.",
    });
  };

  const handleDeleteForm = async (formId: Id<"forms">) => {
    try {
      await deleteForm({ formId });
      toast.success("Form deleted successfully!");
    } catch (error) {
      console.error("Failed to delete form:", error);
      toast.error("Failed to delete form. Please try again.");
    }
  };

  const columns: ColumnDef<Form>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        // Trim description to 50 characters and add ellipsis if longer
        const trimmedDesc = description
          ? description.length > 50
            ? `${description.substring(0, 50)}...`
            : description
          : "-";

        return (
          <div className="font-medium max-w-md truncate">{trimmedDesc}</div>
        );
      },
    },
    {
      accessorKey: "isPublished",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const isPublished = row.getValue("isPublished");
        return (
          <Badge variant={isPublished ? "default" : "secondary"}>
            {isPublished ? "Published" : "Draft"}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id) ? "true" : "false");
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
      ),
      cell: ({ row }) =>
        format(new Date(row.getValue("createdAt")), "MMM dd, yyyy"),
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Updated" />
      ),
      cell: ({ row }) =>
        format(new Date(row.getValue("updatedAt")), "MMM dd, yyyy"),
    },
    {
      accessorKey: "responseCount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Responses" />
      ),
      cell: ({ row }) => row.original.responseCount || 0,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const form = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/forms/${form._id}`)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/dashboard/forms/${form._id}`)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => copyShareLink(form._id)}>
                <CopyIcon className="mr-2 h-4 w-4" />
                Copy Share Link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteForm(form._id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Your Forms</h1>
          <p className="text-muted-foreground mt-2">
            Manage your forms, view responses, and edit settings.
          </p>
        </div>
        <CreateFormButton label="Generate Form" />
      </div>

      <DataTable columns={columns} data={forms} key="forms-table" />
    </div>
  );
}
