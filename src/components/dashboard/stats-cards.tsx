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
  };

  const cards = [
    {
      title: "Total Forms",
      value: stats.formCount,
      subtitle: `+${stats.formCount} from last month`,
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Responses",
      value: stats.responseCount,
      subtitle: `+100% increase`,
      icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Completion Rate",
      value: `100%`,
      subtitle: `+80% from traditional forms`,
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Avg. Response Time",
      value: stats.avgResponseTime,
      subtitle: `0% vs standard forms`,
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
