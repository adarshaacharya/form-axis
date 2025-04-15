import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function ArchivedFormsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">
          Forms that are archived will not be visible to users but can be
          restored.
        </p>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href="/dashboard/forms">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forms
        </Link>
      </Button>
    </div>
  );
}
