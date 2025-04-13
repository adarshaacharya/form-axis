import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listFormResponses = query({
  args: { formId: v.id("forms") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const form = await ctx.db.get(args.formId);
    if (!form || form.userId !== identity.subject) {
      throw new Error("Not authorized to view responses");
    }

    return await ctx.db
      .query("responses")
      .withIndex("by_form", (q) => q.eq("formId", args.formId))
      .collect();
  },
});

export const submitResponse = mutation({
  args: {
    formId: v.id("forms"),
    answers: v.array(
      v.object({
        fieldId: v.id("formFields"),
        value: v.union(v.string(), v.number(), v.null()),
      })
    ),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const form = await ctx.db.get(args.formId);

    if (!form) throw new Error("Form not found");
    if (!form.isPublished) throw new Error("Form is not published");
    if (!form.settings.allowAnonymous && !identity) {
      throw new Error("Authentication required to submit this form");
    }
    if (form.settings.collectEmail && !args.email) {
      throw new Error("Email is required for this form");
    }

    // Check response limits
    if (form.settings.maxResponses) {
      const responseCount = await ctx.db
        .query("responses")
        .withIndex("by_form", (q) => q.eq("formId", args.formId))
        .collect();

      if (responseCount.length >= form.settings.maxResponses) {
        throw new Error("Form has reached maximum number of responses");
      }
    }

    // Check expiration
    if (
      form.settings.expiresAt &&
      new Date(form.settings.expiresAt) < new Date()
    ) {
      throw new Error("Form has expired");
    }

    // Validate required fields
    const fields = await ctx.db
      .query("formFields")
      .withIndex("by_form", (q) => q.eq("formId", args.formId))
      .collect();

    const requiredFields = fields.filter((field) => field.required);
    const answeredFieldIds = args.answers.map((answer) => answer.fieldId);

    for (const field of requiredFields) {
      if (!answeredFieldIds.includes(field._id)) {
        throw new Error(`Required field "${field.label}" is not answered`);
      }
    }

    return await ctx.db.insert("responses", {
      formId: args.formId,
      userId: identity?.subject,
      submittedAt: new Date().toISOString(),
      respondentEmail: args.email,
      answers: args.answers,
    });
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
