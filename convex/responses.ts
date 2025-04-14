import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get responses for a form (for form owner)
export const getFormResponses = query({
  args: { formId: v.id("forms") },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get the form to check ownership
    const form = await ctx.db.get(args.formId);
    if (!form || form.userId !== identity.subject) {
      throw new Error("Not authorized");
    }

    // Get all responses for the form
    const responses = await ctx.db
      .query("responses")
      .withIndex("by_form", (q) => q.eq("formId", args.formId))
      .collect();

    return responses;
  },
});

// Submit a form response
export const submitResponse = mutation({
  args: {
    formId: v.id("forms"),
    answers: v.array(
      v.object({
        fieldId: v.id("formFields"),
        value: v.union(v.string(), v.number(), v.null()),
      })
    ),
    respondentEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if the form exists and is published
    const form = await ctx.db.get(args.formId);
    if (!form) {
      throw new Error("Form not found");
    }

    if (!form.isPublished) {
      throw new Error("Cannot submit responses to an unpublished form");
    }

    // Get optional user identity if available
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;

    // Create a new response entry
    const responseId = await ctx.db.insert("responses", {
      formId: args.formId,
      userId: userId,
      submittedAt: new Date().toISOString(),
      respondentEmail: args.respondentEmail,
      answers: args.answers,
    });

    return responseId;
  },
});

export const getResponse = query({
  args: { responseId: v.id("responses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const response = await ctx.db.get(args.responseId);
    if (!response) throw new Error("Response not found");

    const form = await ctx.db.get(response.formId);
    if (!form || form.userId !== identity.subject) {
      throw new Error("Not authorized to view this response");
    }

    return response;
  },
});

export const deleteResponse = mutation({
  args: { responseId: v.id("responses") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const response = await ctx.db.get(args.responseId);
    if (!response) throw new Error("Response not found");

    const form = await ctx.db.get(response.formId);
    if (!form || form.userId !== identity.subject) {
      throw new Error("Not authorized to delete this response");
    }

    await ctx.db.delete(args.responseId);
  },
});
