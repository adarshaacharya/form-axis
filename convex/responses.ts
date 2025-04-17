import { Infer, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { Migrations, MigrationStatus } from "@convex-dev/migrations";
import { DataModel } from "./_generated/dataModel.js";
import { components, internal } from "./_generated/api.js";

/**
 * Migrations
 */
export const migrations = new Migrations<DataModel>(components.migrations);
export const run = migrations.runner();

export const setDefaultStartAt = migrations.define({
  table: "responses",
  batchSize: 2,
  migrateOne: async (_ctx, doc) => {
    if (doc.startedAt === undefined) {
      return { startedAt: new Date().toISOString() };
    }
  },
  parallelize: true,
});

export const setDefaultResponseTimeMs = migrations.define({
  table: "responses",
  batchSize: 2,
  migrateOne: async (_ctx, doc) => {
    if (doc.responseTimeMs === undefined) {
      return {
        responseTimeMs: 30 * 1000,
      }; // set 30s as default
    }
  },
  parallelize: true,
});

const allMigrations = [
  internal.responses.setDefaultStartAt,
  internal.responses.setDefaultResponseTimeMs,
];

export const runAll = migrations.runner(allMigrations);

// Call this from a deploy script to run them after pushing code.
export const postDeploy = internalMutation({
  args: {},
  handler: async (ctx) => {
    await migrations.runSerially(ctx, allMigrations);
  },
});

/**
 * reference:
 * export const setDefaultValue = migrations.define({
  table: "myTable",
  batchSize: 2,
  migrateOne: async (_ctx, doc) => {
    if (doc.optionalField === undefined) {
      return { optionalField: "default" };
    }
  },
  parallelize: true,
});

 */
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
  startedAt: v.string(),
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

    const submittedAt = new Date().toISOString();
    let responseTimeMs: number | undefined = undefined;

    // Calculate response time in milliseconds
    try {
      const startTime = new Date(args.startedAt).getTime();
      const endTime = new Date(submittedAt).getTime();
      responseTimeMs = endTime - startTime;

      // Validate the calculated time (avoid negative values from clock issues)
      if (responseTimeMs < 0 || responseTimeMs > 24 * 60 * 60 * 1000) {
        responseTimeMs = undefined; // Invalid time (negative or > 24 hours)
      }
    } catch (error) {
      console.error("Error calculating response time:", error);
    }

    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;

    const responseId = await ctx.db.insert("responses", {
      formId: args.formId,
      userId: userId || null,
      startedAt: args.startedAt,
      submittedAt: submittedAt,
      responseTimeMs: responseTimeMs,
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

    // Calculate average response time
    let totalResponseTime = 0;
    let validResponseTimes = 0;

    responses.forEach((response) => {
      totalAnsweredQuestions += response.answers.filter((a) => a.value).length;
      totalQuestionsPossible += totalFields; // Assuming each response should have answered all fields

      // Add up valid response times for average calculation
      if (response.responseTimeMs && response.responseTimeMs > 0) {
        totalResponseTime += response.responseTimeMs;
        validResponseTimes++;
      }
    });

    const completionRate =
      totalQuestionsPossible > 0
        ? Math.round((totalAnsweredQuestions / totalQuestionsPossible) * 100)
        : 0;

    // Calculate average response time and format it
    const avgResponseTimeMs =
      validResponseTimes > 0
        ? Math.round(totalResponseTime / validResponseTimes)
        : 0;

    // Format the response time in a human-readable format (e.g., "2m 10s")
    const responseRate = formatResponseTime(avgResponseTimeMs);

    return {
      totalResponses: responses.length,
      completionRate,
      responseRate,
      avgResponseTimeMs,
      formFieldsCount: formFields.length,
    };
  },
});

/**
 * Helper function to format milliseconds into a human-readable format (e.g., "2m 10s")
 */
function formatResponseTime(ms: number): string {
  if (ms <= 0) return "-";

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}
