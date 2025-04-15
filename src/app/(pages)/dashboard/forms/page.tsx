import { FormsTable } from "@/components/forms/list/forms-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forms | Form Axis",
  description: "View and manage your forms",
};

export default function FormsPage() {
  return (
    <main className="p-6">
      <FormsTable />
    </main>
  );
}
