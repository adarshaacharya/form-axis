import { ArchivedFormsTable } from "@/components/forms/archive/archived-forms-table";

export default function ArchivedFormsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Archived Forms
        </h1>
        <p className="text-muted-foreground">
          View and restore your archived forms. Archived forms are not visible
          to users.
        </p>
      </div>

      <ArchivedFormsTable />
    </div>
  );
}
