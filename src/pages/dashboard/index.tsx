import { useOutletContext } from "react-router-dom";

import DashboardHeader from "./ui/DashboardHeader";
import DashboardBanner from "./ui/DashboardBanner";
import DashboardSummary from "./ui/DashboardCard";

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
      </main>
    </div>
  );
}
