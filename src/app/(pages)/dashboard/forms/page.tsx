import { FormsTable } from "@/components/forms/list/forms-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forms | Form Pilot",
  description: "View and manage your forms",
};

export default function FormsPage() {
  return (
    <main className="container mx-auto p-6">
      <FormsTable />
    </main>
  );
}
