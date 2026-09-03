import { useModal } from "@/shared/hooks/useModal";
import CaseManagementHeader from "./ui/CaseManagementHeader";
import CaseListSection from "./ui/CaseListSection";
import NewCaseModal from "./ui/NewCaseModal";

export default function CaseManagementPage() {
  const newCaseModal = useModal();

  return (
    <div className="flex flex-col gap-6">
      <CaseManagementHeader />

      <CaseListSection onCreateCase={newCaseModal.open} />

      {newCaseModal.isOpen && <NewCaseModal onClose={newCaseModal.close} />}
    </div>
  );
}
