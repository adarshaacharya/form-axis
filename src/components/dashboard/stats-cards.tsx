"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Activity, TrendingUp } from "lucide-react";

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
  const stats = [
    {
      title: "Total Forms",
      value: "8",
      subtitle: "+3 from last month",
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Responses",
      value: "124",
      subtitle: "+22% increase",
      icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Completion Rate",
      value: "93.4%",
      subtitle: "+15.2% from traditional forms",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Avg. Response Time",
      value: "2m 10s",
      subtitle: "-40% vs standard forms",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
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
