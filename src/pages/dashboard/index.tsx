import { useOutletContext } from "react-router-dom";

import DashboardHeader from "./ui/DashboardHeader";
import DashboardBanner from "./ui/DashboardBanner";

type LayoutContext = {
  isCollapsed: boolean;
};

export default function DashboardPage() {
  const { isCollapsed } = useOutletContext<LayoutContext>();

  return (
    <div className="flex flex-col">
      <main>
        <DashboardHeader />
        <DashboardBanner sidebarCollapsed={isCollapsed} />
      </main>
    </div>
  );
}
