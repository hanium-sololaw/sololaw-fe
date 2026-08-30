import DashboardHeader from "./ui/DashboardHeader";
import DashboardBanner from "./ui/DashboardBanner";
import DashboardSummary from "./ui/DashboardCard";
import DashboardSchedule from "./ui/DashboardSchedule";
import DashboardRecentActivity from "./ui/DashboardRecentActivity";
import DashboardHelpContent from "./ui/DashboardHelpContent";
import DashboardFAQ from "./ui/DashboardFAQ";

export default function DashboardPage() {
  return (
    <div className="flex flex-col pb-6">
      <main className="flex flex-col gap-8">
        <div>
          <DashboardHeader />
          <DashboardBanner />
        </div>

        <DashboardSummary />

        <div className="grid grid-cols-[auto_1fr] gap-6">
          <DashboardSchedule />

          <div className="flex flex-col gap-6">
            <DashboardRecentActivity />

            <div className="grid grid-cols-2 gap-6">
              <DashboardHelpContent />
              <DashboardFAQ />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
