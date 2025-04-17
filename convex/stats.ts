import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Helper function to format milliseconds into a human-readable format
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

export const getOverallStats = query({
  args: {},
  returns: v.object({
    formCount: v.number(),
    responseCount: v.number(),
    completionRate: v.number(),
    avgResponseTime: v.string(),
    avgResponseTimeMs: v.optional(v.number()),
  }),
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

    // Calculate average response time from the responseTimeMs field
    let totalResponseTime = 0;
    let validResponseTimes = 0;

    for (const response of responses) {
      if (response.responseTimeMs && response.responseTimeMs > 0) {
        totalResponseTime += response.responseTimeMs;
        validResponseTimes++;
      }
    }

    const avgResponseTimeMs =
      validResponseTimes > 0
        ? Math.round(totalResponseTime / validResponseTimes)
        : 0;

    const avgResponseTime = formatResponseTime(avgResponseTimeMs);

    return {
      formCount,
      responseCount,
      completionRate:
        formCount === 0 ? 0 : Math.round((responseCount / formCount) * 100),
      avgResponseTime,
      avgResponseTimeMs,
    };
  },
});
