import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  FileText,
  MessageSquare,
  Share2,
  Star,
  TrendingUp,
  Users,
  Plus,
} from "lucide-react";
import Link from "next/link";
import CreateFormButton from "@/components/prompt-dialog/create-form-button";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your conversational forms and responses.
          </p>
        </div>
        <CreateFormButton />
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              +3 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Responses
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground mt-1">+22% increase</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93.4%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +15.2% from traditional forms
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Response Time
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 10s</div>
            <p className="text-xs text-muted-foreground mt-1">
              -40% vs standard forms
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Response Trends</CardTitle>
            <CardDescription>
              Monthly form submissions and completion rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end gap-2">
              {[40, 25, 45, 30, 60, 75, 65, 45, 50, 65, 70, 80].map(
                (height, i) => (
                  <div
                    key={i}
                    className="bg-primary/10 hover:bg-primary/20 rounded-md w-full transition-colors"
                    style={{ height: `${height}%` }}
                  />
                )
              )}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Form Performance</CardTitle>
            <CardDescription>Your most successful forms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Customer Feedback</p>
                  <Progress value={92} />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Product Survey</p>
                  <Progress value={78} />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Job Application</p>
                  <Progress value={65} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Create and manage forms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              asChild
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Link href="/dashboard/forms">
                <FileText className="h-4 w-4" />
                Create Form
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Link href="/dashboard/analytics">
                <TrendingUp className="h-4 w-4" />
                View Responses
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Link href="/dashboard/templates">
                <Share2 className="h-4 w-4" />
                Share Forms
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest form responses and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "New Response Received",
                  description:
                    "Customer Feedback form received a new detailed response.",
                  time: "10 minutes ago",
                },
                {
                  title: "Form Published",
                  description:
                    "Your 'Product Survey' form is now live and shareable.",
                  time: "2 hours ago",
                },
                {
                  title: "High Completion Rate",
                  description:
                    "Your conversational forms are achieving 93% completion rates!",
                  time: "1 day ago",
                },
              ].map((update, i) => (
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
      </div>
    </div>
  );
}
