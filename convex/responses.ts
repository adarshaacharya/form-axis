import { Infer, v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Schemas
 */
export const CreateResponseSchema = v.object({
  formId: v.id("forms"),
  answers: v.array(
    v.object({
      fieldId: v.id("formFields"),
      value: v.union(v.string(), v.number(), v.null()),
    })
  ),
  respondentEmail: v.optional(v.union(v.string(), v.null())),
});
export type CreateResponseArgs = Infer<typeof CreateResponseSchema>;

/**
 * Mutations / Queries
 */
// Get all responses for a form
export const getFormResponses = query({
  args: {
    formId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const form = await ctx.db.get(args.formId);
    if (!form) {
      return [];
    }

    if (form.userId !== identity.subject) {
      throw new Error("Not authorized to view responses");
    }

    const responses = await ctx.db
      .query("responses")
      .withIndex("by_form", (q) => q.eq("formId", args.formId))
      .order("desc")
      .collect();

    return responses;
  },
});

// Submit a response to a form
export const submitResponse = mutation({
  args: CreateResponseSchema,
  handler: async (ctx, args) => {
    const form = await ctx.db.get(args.formId);
    if (!form) {
      throw new Error("Form not found");
    }

    if (form.status !== "published") {
      throw new Error("Cannot submit response to unpublished form");
    }

    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;

    const responseId = await ctx.db.insert("responses", {
      formId: args.formId,
      userId: userId || null,
      submittedAt: new Date().toISOString(),
      respondentEmail: args.respondentEmail || null,
      answers: args.answers,
    });

    return responseId;
  },
});

// Get a single response with detailed field information
export const getResponseDetails = query({
  args: {
    responseId: v.id("responses"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const response = await ctx.db.get(args.responseId);
    if (!response) {
      throw new Error("Response not found");
    }

    const form = await ctx.db.get(response.formId);
    if (!form || form.userId !== identity.subject) {
      throw new Error("Not authorized to view this response");
    }

    const formFields = await ctx.db
      .query("formFields")
      .withIndex("by_form", (q) => q.eq("formId", response.formId))
      .collect();

    const enhancedAnswers = await Promise.all(
      response.answers.map(async (answer) => {
        const field = await ctx.db.get(answer.fieldId);
        return {
          ...answer,
          fieldLabel: field?.label || "Unknown Field",
          fieldType: field?.type || "shortText",
        };
      })
    );

    // For analytics, fetch count of all responses for this form
    const allResponses = await ctx.db
      .query("responses")
      .withIndex("by_form", (q) => q.eq("formId", response.formId))
      .collect();

    const responseCount = allResponses.length;

    return {
      ...response,
      enhancedAnswers,
      analytics: {
        responseCount,
        formFieldsCount: formFields.length,
      },
    };
  },
});

// Delete a response
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


// Get form analytics
export const getFormAnalytics = query({
  args: {
    formId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const form = await ctx.db.get(args.formId);
    if (!form) {
      throw new Error("Form not found");
    }

    if (form.userId !== identity.subject) {
      throw new Error("Not authorized to view analytics");
    }

    const responses = await ctx.db
      .query("responses")
      .withIndex("by_form", (q) => q.eq("formId", args.formId))
      .collect();

    const formFields = await ctx.db
      .query("formFields")
      .withIndex("by_form", (q) => q.eq("formId", args.formId))
      .collect();

    const totalFields = formFields.length;
    let totalAnsweredQuestions = 0;
    let totalQuestionsPossible = 0;

    responses.forEach((response) => {
      totalAnsweredQuestions += response.answers.filter((a) => a.value).length;
      totalQuestionsPossible += totalFields; // Assuming each response should have answered all fields
    });

    const completionRate =
      totalQuestionsPossible > 0
        ? Math.round((totalAnsweredQuestions / totalQuestionsPossible) * 100)
        : 0;

    return {
      totalResponses: responses.length,
      completionRate,
      responseRate: "2m 10s", // This would actually be calculated but using static data here
      formFieldsCount: formFields.length,
    };
  },
});
