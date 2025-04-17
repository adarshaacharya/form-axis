"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Activity, TrendingUp } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
}

export function StatCard({ title, value, subtitle, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const stats = useQuery(api.stats.getOverallStats, {}) ?? {
    formCount: 0,
    responseCount: 0,
    completionRate: 0,
    avgResponseTime: "-",
    avgResponseTimeMs: 0,
  };

  // Calculate time difference based on average response time
  const getTimeDifference = () => {
    if (!stats.avgResponseTimeMs || stats.avgResponseTimeMs <= 0) {
      return "Just implemented";
    }

    // Average traditional form time (estimated at 5 minutes)
    const traditionalFormTimeMs = 5 * 60 * 1000;
    const difference = traditionalFormTimeMs - stats.avgResponseTimeMs;

    if (difference > 0) {
      const percentFaster = Math.round(
        (difference / traditionalFormTimeMs) * 100
      );
      return `${percentFaster}% faster than traditional forms`;
    } else {
      return "Comparable to standard forms";
    }
  };

  const cards = [
    {
      title: "Total Forms",
      value: stats.formCount,
      subtitle: `${stats.formCount > 0 ? "+" + stats.formCount : "0"} from last month`,
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Responses",
      value: stats.responseCount,
      subtitle:
        stats.responseCount > 0
          ? `Across ${stats.formCount} forms`
          : "No responses yet",
      icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate}%`,
      subtitle: `Based on submitted responses`,
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Avg. Response Time",
      value: stats.avgResponseTime,
      subtitle: getTimeDifference(),
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
