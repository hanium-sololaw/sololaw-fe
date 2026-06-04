import { useOutletContext } from "react-router-dom";

import DashboardHeader from "./ui/DashboardHeader";
import DashboardBanner from "./ui/DashboardBanner";
import DashboardSummary from "./ui/DashboardCard";
import DashboardSchedule from "./ui/DashboardSchedule";

type LayoutContext = {
  isCollapsed: boolean;
};

export default function DashboardPage() {
  const { isCollapsed } = useOutletContext<LayoutContext>();

  return (
    <div className="flex flex-col">
      <main className="flex flex-col gap-8">
        <div>
          <DashboardHeader />
          <DashboardBanner sidebarCollapsed={isCollapsed} />
        </div>

        <DashboardSummary />

        <div className="grid grid-cols-[520px_1fr] gap-6">
          {/* 좌측 */}
          <DashboardSchedule />

          {/* 우측 */}
          <div className="rounded-[28px] border border-gray-200 bg-white">
            우측 컨텐츠
          </div>
        </div>
      </main>
    </div>
  );
}
