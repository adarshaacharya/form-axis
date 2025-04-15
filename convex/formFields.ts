import { mutation, query } from "./_generated/server";
import { ConvexError, Infer, v } from "convex/values";
import { fieldTypeSchema } from "./schema";

/**
 * SCHEMAS
 */

const CreateFormFieldSchema = v.object({
  formId: v.id("forms"),
  order: v.number(),
  type: fieldTypeSchema,
  label: v.string(),
  required: v.boolean(),
  placeholder: v.optional(v.string()),
  description: v.optional(v.string()),
  validation: v.optional(
    v.object({
      minLength: v.optional(v.number()),
      maxLength: v.optional(v.number()),
      min: v.optional(v.number()),
      max: v.optional(v.number()),
    })
  ),
});
export type CreateFormFieldArgs = Infer<typeof CreateFormFieldSchema>;

export const UpdateFormFieldSchema = v.object({
  fieldId: v.id("formFields"),
  order: v.number(),
  type: fieldTypeSchema,
  label: v.string(),
  required: v.boolean(),
  placeholder: v.optional(v.string()),
  description: v.optional(v.string()),
  validation: v.optional(
    v.object({
      minLength: v.optional(v.number()),
      maxLength: v.optional(v.number()),
      min: v.optional(v.number()),
      max: v.optional(v.number()),
    })
  ),
});
export type UpdateFormFieldArgs = Infer<typeof UpdateFormFieldSchema>;

/**
 * QUERIES / MUTATIONS
 */

// Get all form fields for a specific form
export const getFormFields = query({
  args: { formId: v.id("forms") },
  handler: async (ctx, args) => {
    const fields = await ctx.db
      .query("formFields")
      .withIndex("by_form", (q) => q.eq("formId", args.formId))
      .order("asc")
      .collect();

    return fields;
  },
});

// Create a new form field
export const createFormField = mutation({
  args: CreateFormFieldSchema,
  handler: async (ctx, args) => {
    const form = await ctx.db.get(args.formId);
    if (!form) {
      throw new ConvexError("Form not found");
    }

    const fieldId = await ctx.db.insert("formFields", {
      formId: args.formId,
      order: args.order,
      type: args.type,
      label: args.label,
      required: args.required,
      placeholder: args.placeholder,
      description: args.description,
      validation: args.validation,
    });

    await ctx.db.patch(args.formId, {
      updatedAt: new Date().toISOString(),
    });

    return fieldId;
  },
});

// Update an existing form field
export const updateFormField = mutation({
  args: UpdateFormFieldSchema,
  handler: async (ctx, args) => {
    const field = await ctx.db.get(args.fieldId);
    if (!field) {
      throw new ConvexError("Field not found");
    }

    await ctx.db.patch(args.fieldId, {
      order: args.order,
      type: args.type,
      label: args.label,
      required: args.required,
      placeholder: args.placeholder,
      description: args.description,
      validation: args.validation,
    });

    await ctx.db.patch(field.formId, {
      updatedAt: new Date().toISOString(),
    });

    return args.fieldId;
  },
});

// Delete a form field
export const deleteFormField = mutation({
  args: {
    fieldId: v.id("formFields"),
  },
  handler: async (ctx, args) => {
    const field = await ctx.db.get(args.fieldId);
    if (!field) {
      throw new ConvexError("Field not found");
    }

    const formId = field.formId;

    await ctx.db.delete(args.fieldId);

    // Get remaining fields to reorder them
    const remainingFields = await ctx.db
      .query("formFields")
      .withIndex("by_form", (q) => q.eq("formId", formId))
      .order("asc")
      .collect();

    // Reorder the remaining fields
    for (let i = 0; i < remainingFields.length; i++) {
      if (remainingFields[i].order !== i) {
        await ctx.db.patch(remainingFields[i]._id, { order: i });
      }
    }

    await ctx.db.patch(formId, {
      updatedAt: new Date().toISOString(),
    });

    return true;
  },
});

// Get a single form field
export const getFormField = query({
  args: { fieldId: v.id("formFields") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.fieldId);
  },
});
