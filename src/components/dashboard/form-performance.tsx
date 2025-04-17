"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, Users } from "lucide-react";

export function FormPerformance() {
  const topForms = [
    {
      name: "Customer Feedback",
      value: 0,
      icon: <Star className="h-4 w-4 text-primary" />,
    },
    {
      name: "Product Survey",
      value: 0,
      icon: <TrendingUp className="h-4 w-4 text-primary" />,
    },
    {
      name: "Job Application",
      value: 0,
      icon: <Users className="h-4 w-4 text-primary" />,
    },
  ];

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Form Performance</CardTitle>
        <CardDescription>Your most successful forms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topForms.map((form, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">{form.icon}</div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{form.name}</p>
                <Progress value={form.value} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
