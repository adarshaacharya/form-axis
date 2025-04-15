"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, ArchiveRestore } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Id } from "@/convex/_generated/dataModel";
import { Form } from "@/lib/types";

interface ArchivedFormsDataTableProps {
  forms: Form[];
  onUnarchiveRequest: (formId: Id<"forms">, e: React.MouseEvent) => void;
}

export function ArchivedFormsDataTable({
  forms,
  onUnarchiveRequest,
}: ArchivedFormsDataTableProps) {
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
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({}) => {
        return <Badge variant="outline">Archived</Badge>;
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
      id: "actions",
      cell: ({ row }) => {
        const form = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()} // Prevent row click event
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={(e) => onUnarchiveRequest(form._id, e)}
              >
                <ArchiveRestore className="mr-2 h-4 w-4" />
                Restore Form
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Empty state for when there are no archived forms
  if (forms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
        <div className="p-3 rounded-full bg-muted">
          <ArchiveRestore className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No archived forms</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs">
          When you archive forms, they will appear here. You can restore them
          anytime.
        </p>
      </div>
    );
  }

  return (
    <DataTable columns={columns} data={forms} key="archived-forms-table" />
  );
}
