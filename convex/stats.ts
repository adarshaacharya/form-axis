import { query } from "./_generated/server";

export const getOverallStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const forms = await ctx.db
      .query("forms")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const formCount = forms.length;

    const responses = await ctx.db
      .query("responses")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const responseCount = responses.length;

    return {
      formCount,
      responseCount,
      completionRate:
        formCount === 0 ? 0 : Math.round((responseCount / formCount) * 100),
      avgResponseTime: "-",
    };
  },
});
