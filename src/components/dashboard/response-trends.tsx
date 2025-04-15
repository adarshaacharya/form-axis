"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ResponseTrends() {
  const monthlyData = [40, 25, 45, 30, 60, 75, 65, 45, 50, 65, 70, 80];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Response Trends</CardTitle>
        <CardDescription>
          Monthly form submissions and completion rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-end gap-2">
          {monthlyData.map((height, i) => (
            <div
              key={i}
              className="bg-primary/40 hover:bg-primary/60 rounded-md w-full transition-colors"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {months.map((month, i) => (
            <span key={i}>{month}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
