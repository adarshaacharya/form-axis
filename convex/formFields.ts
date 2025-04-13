import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
  args: {
    formId: v.id("forms"),
    order: v.number(),
    type: v.string(),
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
  },
  handler: async (ctx, args) => {
    // Verify that the form exists
    const form = await ctx.db.get(args.formId);
    if (!form) {
      throw new Error("Form not found");
    }

    // Create the new field
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

    // Update the form's updatedAt timestamp
    await ctx.db.patch(args.formId, {
      updatedAt: new Date().toISOString(),
    });

    return fieldId;
  },
});

// Update an existing form field
export const updateFormField = mutation({
  args: {
    fieldId: v.id("formFields"),
    order: v.number(),
    type: v.string(),
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
  },
  handler: async (ctx, args) => {
    // Verify that the field exists
    const field = await ctx.db.get(args.fieldId);
    if (!field) {
      throw new Error("Field not found");
    }

    // Update the field
    await ctx.db.patch(args.fieldId, {
      order: args.order,
      type: args.type,
      label: args.label,
      required: args.required,
      placeholder: args.placeholder,
      description: args.description,
      validation: args.validation,
    });

    // Update the form's updatedAt timestamp
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
    // Verify that the field exists
    const field = await ctx.db.get(args.fieldId);
    if (!field) {
      throw new Error("Field not found");
    }

    // Get the formId before deleting
    const formId = field.formId;

    // Delete the field
    await ctx.db.delete(args.fieldId);

    // Get remaining fields to reorder them
    const remainingFields = await ctx.db
      .query("formFields")
      .withIndex("by_form", (q) => q.eq("formId", formId))
      .order("asc", "order")
      .collect();

    // Reorder the remaining fields
    for (let i = 0; i < remainingFields.length; i++) {
      if (remainingFields[i].order !== i) {
        await ctx.db.patch(remainingFields[i]._id, { order: i });
      }
    }

    // Update the form's updatedAt timestamp
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
