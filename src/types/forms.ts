import { Id } from "@/convex/_generated/dataModel";

export interface Form {
  _id: Id<"forms">;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: "draft" | "published" | "archived";
  originalPrompt: string;
  settings?: {
    allowAnonymous: boolean;
    collectEmail: boolean;
    maxResponses?: number;
    expiresAt?: string;
  };
  responseCount?: number;
}
