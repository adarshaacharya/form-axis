"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, Share2 } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    {
      label: "Generate Form",
      href: "/dashboard/forms",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: "View Responses",
      href: "/dashboard/forms",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      label: "Share Forms",
      href: "/dashboard/forms",
      icon: <Share2 className="h-4 w-4" />,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Create and manage forms</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            asChild
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <Link href={action.href}>
              {action.icon}
              {action.label}
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
