"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { InboxIcon, Share2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";

interface ResponseShareEmptyStateProps {
  formId: Id<"forms">;
}

export function ResponseShareEmptyState({
  formId,
}: ResponseShareEmptyStateProps) {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/forms/${formId}`);
    }
  }, [formId]);

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied to clipboard!", {
      description:
        "You can now share this link with others to collect responses.",
    });
  };

  return (
    <Card className="w-full max-w-2xl border-dashed">
      <CardContent className="p-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="rounded-full bg-muted p-6"
          >
            <InboxIcon className="h-12 w-12 text-muted-foreground/60" />
          </motion.div>

          <div className="space-y-2 text-center">
            <h3 className="font-semibold text-xl">No responses yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Share your form to start collecting responses from users.
            </p>
          </div>

          <div className="w-full max-w-md space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1 bg-muted/50"
                onClick={(e) => e.currentTarget.select()}
              />
              <Button onClick={copyShareLink} className="gap-2">
                <Share2 size={16} />
                Copy Link
              </Button>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent("Please fill out my form created with FormPilot:")}`,
                    "_blank"
                  )
                }
              >
                Share on Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    "_blank"
                  )
                }
              >
                Share on Facebook
              </Button>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
