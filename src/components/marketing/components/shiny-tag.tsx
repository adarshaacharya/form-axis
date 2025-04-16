import React from "react";

export function ShinyTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-orange-900 dark:text-orange-200">
      {children}
    </div>
  );
}
