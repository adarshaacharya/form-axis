"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CopyIcon, Eye, MoreHorizontal, Pencil, Archive } from "lucide-react";
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
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Id } from "@/convex/_generated/dataModel";
import { Form } from "@/lib/types";

interface FormDataTableProps {
  forms: (Form & { responseCount: number })[];
  onRowClick: (formId: Id<"forms">) => void;
  onArchiveRequest: (formId: Id<"forms">, e: React.MouseEvent) => void;
}

export function FormDataTable({
  forms,
  onRowClick,
  onArchiveRequest,
}: FormDataTableProps) {
  const columns: ColumnDef<Form & { responseCount: number }>[] = [
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
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={status === "published" ? "default" : "secondary"}>
            {status === "published" ? "Published" : "Draft"}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
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
      cell: ({ row }) => (
        <FormRowActions
          form={row.original}
          onArchiveRequest={onArchiveRequest}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={forms}
      key="forms-table"
      onRowClick={(row) => onRowClick(row.original._id)}
    />
  );
}

interface FormRowActionsProps {
  form: Form;
  onArchiveRequest: (formId: Id<"forms">, e: React.MouseEvent) => void;
}

function FormRowActions({ form, onArchiveRequest }: FormRowActionsProps) {
  const router = useRouter();

  const copyShareLink = (formId: Id<"forms">) => {
    const shareLink = `${window.location.origin}/forms/${formId}`;
    navigator.clipboard.writeText(shareLink);

    toast.success("Share link copied to clipboard!", {
      description: "You can now share this link with others.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <a
          href={`${process.env.NEXT_PUBLIC_APP_URL}/forms/${form._id}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </DropdownMenuItem>
        </a>

        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/forms/${form._id}`)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();

            copyShareLink(form._id);
          }}
        >
          <CopyIcon className="mr-2 h-4 w-4" />
          Copy Share Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => onArchiveRequest(form._id, e)}
          className="text-red-600 focus:text-red-600"
        >
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
