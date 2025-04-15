"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Globe, GlobeLock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PublishFormButtonProps {
  isPublished: boolean;
  onPublishToggle: () => Promise<void>;
  className?: string;
}

export function PublishFormButton({
  isPublished,
  onPublishToggle,
  className,
}: PublishFormButtonProps) {
  const [isPending, setIsPending] = React.useState(false);

  const handleClick = async () => {
    setIsPending(true);
    try {
      await onPublishToggle();
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      size="sm"
      variant={isPublished ? "outline" : "default"}
      className={cn(
        isPublished
          ? "border-green-600/30 hover:bg-green-600/10 text-green-600"
          : "bg-primary",
        "gap-2 transition-all",
        className
      )}
      disabled={isPending}
      onClick={handleClick}
    >
      {isPublished ? (
        <>
          <GlobeLock className="h-4 w-4" />
          {isPending ? "Unpublishing..." : "Unpublish Form"}
        </>
      ) : (
        <>
          <Globe className="h-4 w-4" />
          {isPending ? "Publishing..." : "Publish Form"}
        </>
      )}
    </Button>
  );
}
