import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { fieldTypeSchema } from "./schema";

export const listForms = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await ctx.db
      .query("forms")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) =>
        q.or(
          q.eq(q.field("status"), "draft"),
          q.eq(q.field("status"), "published")
        )
      )
      .collect();
  },
});

// New query to get all forms including archived ones, for admin purposes
export const listAllForms = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await ctx.db
      .query("forms")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const getForm = query({
  args: { formId: v.id("forms") },
  handler: async (ctx, args) => {
    const form = await ctx.db.get(args.formId);
    if (!form) return null;

    if (form.status === "published") {
      return form;
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity || identity.subject !== form.userId) {
      return null; // Return null instead of throwing for public routes
    }

    return form;
  },
});

// For public form access specifically (no auth check)
export const getPublicForm = query({
  args: { formId: v.id("forms") },
  handler: async (ctx, args) => {
    const form = await ctx.db.get(args.formId);

    // Only return the form if it exists and is published
    if (!form || form.status !== "published") {
      return null;
    }

    return form;
  },
});

export const createForm = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    questions: v.optional(
      v.array(
        v.object({
          content: v.string(),
          type: fieldTypeSchema,
          required: v.boolean(),
        })
      )
    ),
    originalPrompt: v.string(),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const formId = await ctx.db.insert("forms", {
      title: args.title,
      description: args.description,
      originalPrompt: args.originalPrompt,
      userId: identity.subject,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "draft", // Changed from isPublished: false
      settings: { allowAnonymous: true, collectEmail: false },
    });

    if (args.questions) {
      for (const question of args.questions) {
        const formFields = await ctx.db
          .query("formFields")
          .withIndex("by_form", (q) => q.eq("formId", formId))
          .order("asc")
          .collect();

        const order =
          formFields.length > 0
            ? formFields[formFields.length - 1].order + 1
            : 0;

        await ctx.db.insert("formFields", {
          formId: formId,
          order: order,
          type: question.type,
          label: question.content,
          required: question.required,
          placeholder: "",
          validation: undefined,
          description: "",
        });
      }
    }
    await ctx.db.patch(formId, {
      updatedAt: new Date().toISOString(),
    });

    return formId;
  },
});

export const updateForm = mutation({
  args: {
    formId: v.id("forms"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(
      v.union(v.literal("draft"), v.literal("published"), v.literal("archived"))
    ),
    settings: v.optional(
      v.object({
        allowAnonymous: v.boolean(),
        collectEmail: v.boolean(),
        maxResponses: v.optional(v.number()),
        expiresAt: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const form = await ctx.db.get(args.formId);
    if (!form) throw new Error("Form not found");
    if (form.userId !== identity.subject) throw new Error("Not authorized");
    await ctx.db.patch(args.formId, {
      ...(args.title && { title: args.title }),
      ...(args.description !== undefined && { description: args.description }),
      ...(args.status !== undefined && { status: args.status }),
      ...(args.settings && { settings: args.settings }),
      updatedAt: new Date().toISOString(),
    });
  },
});

export const archieveForm = mutation({
  args: { formId: v.id("forms") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const form = await ctx.db.get(args.formId);
    if (!form) throw new Error("Form not found");
    if (form.userId !== identity.subject) throw new Error("Not authorized");
    await ctx.db.patch(args.formId, { status: "archived" });
  },
});

export const listArchivedForms = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await ctx.db
      .query("forms")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("status"), "archived"))
      .collect();
  },
});

export const unArchiveForm = mutation({
  args: { formId: v.id("forms") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const form = await ctx.db.get(args.formId);
    if (!form) throw new Error("Form not found");
    if (form.userId !== identity.subject) throw new Error("Not authorized");
    await ctx.db.patch(args.formId, {
      status: "draft",
      updatedAt: new Date().toISOString(),
    });
  },
});
