"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "../../ui/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "../../ui/data-table/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  showViewOptions?: boolean;
}

const statuses = [
  { label: "All", value: "" },
  { label: "Completed", value: "completed" },
  { label: "In Progress", value: "in-progress" },
  { label: "Not Started", value: "not-started" },
];

const priorities = [
  { label: "All", value: "" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

export function FormsTableToolbar<TData>({
  table,
  showViewOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("isPublished") && (
          <DataTableFacetedFilter
            column={table.getColumn("isPublished")}
            title="Status"
            options={statuses}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      {showViewOptions && <DataTableViewOptions table={table} />}
    </div>
  );
}
