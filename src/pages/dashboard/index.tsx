import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCaseList } from "@/pages/case-management/api/getCaseList";
import NewCaseModal from "@/pages/case-management/ui/NewCaseModal";
import { useModal } from "@/shared/hooks/useModal";
import DashboardHeader from "./ui/DashboardHeader";
import DashboardBanner from "./ui/DashboardBanner";
import DashboardSummary from "./ui/DashboardCard";
import DashboardSchedule from "./ui/DashboardSchedule";
import DashboardRecentActivity from "./ui/DashboardRecentActivity";
import DashboardHelpContent from "./ui/DashboardHelpContent";
import DashboardFAQ from "./ui/DashboardFAQ";
import DashboardEmptyBanner from "./ui/DashboardEmptyBanner";
import DashboardOnboardingCards from "./ui/DashboardOnboardingCards";

export default function DashboardPage() {
  const navigate = useNavigate();
  const newCaseModal = useModal();
  const [hasCases, setHasCases] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getCaseList({ size: 1 })
      .then((page) => {
        if (!cancelled) setHasCases(page.totalElements > 0);
      })
      .catch(() => {
        // keep the default (assume cases exist) when the API call fails
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!hasCases) {
    return (
      <div className="flex flex-col">
        <main className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <DashboardHeader hasCases={false} />
            <DashboardEmptyBanner onCreateCase={newCaseModal.open} />
          </div>

          <DashboardOnboardingCards />
        </main>

        {newCaseModal.isOpen && (
          <NewCaseModal
            onClose={newCaseModal.close}
            onCreated={() => navigate("/case-management")}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <main className="flex flex-col gap-8">
        <div>
          <DashboardHeader hasCases />
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
