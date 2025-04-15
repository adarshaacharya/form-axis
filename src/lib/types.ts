import { Doc } from "@/convex/_generated/dataModel";

export type FormField = Doc<"formFields">;
export type Form = Doc<"forms">;
export type Response = Doc<"responses">;
export type FormSettings = Doc<"forms">["settings"];
export type FormFieldType = Doc<"formFields">["type"];