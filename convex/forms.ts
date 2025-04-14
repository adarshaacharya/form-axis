import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { fieldTypeSchema } from "./schema";
import { internal } from "./_generated/api";

export const listForms = query({
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
    if (!form) throw new Error("Form not found");
    if (!form.isPublished) {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity || identity.subject !== form.userId)
        throw new Error("Not authorized");
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
      isPublished: false,
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
    isPublished: v.optional(v.boolean()),
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
      ...(args.isPublished !== undefined && { isPublished: args.isPublished }),
      ...(args.settings && { settings: args.settings }),
      updatedAt: new Date().toISOString(),
    });
  },
});

export const deleteForm = mutation({
  args: { formId: v.id("forms") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const form = await ctx.db.get(args.formId);
    if (!form) throw new Error("Form not found");
    if (form.userId !== identity.subject) throw new Error("Not authorized");
    await ctx.db.delete(args.formId);
  },
});
