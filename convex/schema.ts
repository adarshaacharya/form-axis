import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const fieldTypeSchema = v.union(
  v.literal("shortText"),
  v.literal("longText"),
  v.literal("number"),
  v.literal("email"),
  v.literal("phone"),
  v.literal("time")
);

export default defineSchema({
  users: defineTable({
    createdAt: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    tokenIdentifier: v.string(),
    userId: v.optional(v.string()), // Identifier for the end-user from the identity provider, not necessarily ( we will store subject here) ?? but this might be deleted as well
  }).index("by_token", ["tokenIdentifier"]),

  forms: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
    userId: v.string(),
    isPublished: v.boolean(),
    settings: v.object({
      allowAnonymous: v.boolean(),
      collectEmail: v.boolean(),
      maxResponses: v.optional(v.number()),
      expiresAt: v.optional(v.string()),
    }),
  })
    .index("by_user", ["userId"])
    .index("by_published", ["isPublished"]),

  formFields: defineTable({
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
  }).index("by_form", ["formId", "order"]),

  responses: defineTable({
    formId: v.id("forms"),
    userId: v.optional(v.string()),
    submittedAt: v.string(),
    respondentEmail: v.optional(v.string()),
    answers: v.array(
      v.object({
        fieldId: v.id("formFields"),
        value: v.union(v.string(), v.number(), v.null()),
      })
    ),
  })
    .index("by_form", ["formId"])
    .index("by_user", ["userId"])
    .index("by_email", ["respondentEmail"]),
});
