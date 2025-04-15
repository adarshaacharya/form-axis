"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RecentActivity() {
  const activities = [
    {
      title: "New Response Received",
      description: "Customer Feedback form received a new detailed response.",
      time: "10 minutes ago",
    },
    {
      title: "Form Published",
      description: "Your 'Product Survey' form is now live and shareable.",
      time: "2 hours ago",
    },
    {
      title: "High Completion Rate",
      description:
        "Your conversational forms are achieving 93% completion rates!",
      time: "1 day ago",
    },
  ];

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest form responses and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((update, i) => (
            <div key={i} className="flex justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{update.title}</p>
                <p className="text-sm text-muted-foreground">
                  {update.description}
                </p>
              </div>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {update.time}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">
          View All Activity
        </Button>
      </CardFooter>
    </Card>
  );
}
