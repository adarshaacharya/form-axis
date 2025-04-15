import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ResponseTrends } from "@/components/dashboard/response-trends";
import { FormPerformance } from "@/components/dashboard/form-performance";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardHeader />

      <StatsCards />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ResponseTrends />
        <FormPerformance />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
}
