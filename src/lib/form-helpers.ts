import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";

// Create a Convex client for server-side requests
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Get form details
export async function getForm(formId: Id<"forms">) {
  try {
    return await convex.query(api.forms.getForm, { formId });
  } catch (error) {
    console.error("Error fetching form:", error);
    return null;
  }
}

// Get form fields
export async function getFormFields(formId: Id<"forms">) {
  try {
    return await convex.query(api.formFields.getFormFields, { formId });
  } catch (error) {
    console.error("Error fetching form fields:", error);
    return [];
  }
}
