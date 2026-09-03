import { useState } from "react";
import { useModal } from "@/shared/hooks/useModal";
import CaseManagementHeader from "./ui/CaseManagementHeader";
import CaseListSection from "./ui/CaseListSection";
import NewCaseModal from "./ui/NewCaseModal";

export default function CaseManagementPage() {
  const newCaseModal = useModal();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <CaseManagementHeader />

      <CaseListSection onCreateCase={newCaseModal.open} refreshKey={refreshKey} />

      {newCaseModal.isOpen && (
        <NewCaseModal
          onClose={newCaseModal.close}
          onCreated={() => {
            setRefreshKey((prev) => prev + 1);
            newCaseModal.close();
          }}
        />
      )}
    </div>
  );
}
