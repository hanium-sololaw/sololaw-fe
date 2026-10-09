import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewCaseModal from "@/pages/case-management/ui/NewCaseModal";
import { useModal } from "@/shared/hooks/useModal";
import type { DocumentTypeId } from "./data/documentTypes";
import { useDocumentCases } from "./lib/useDocumentCases";
import CaseSelectModal from "./ui/home/CaseSelectModal";
import DocumentHeader, { type DocumentSource } from "./ui/home/DocumentHeader";
import DocumentQuickLinks from "./ui/home/DocumentQuickLinks";
import DocumentTips from "./ui/home/DocumentTips";
import DocumentTypeSelector from "./ui/home/DocumentTypeSelector";
import RecentDocumentsList from "./ui/home/RecentDocumentsList";

const ROUTE_BY_TYPE: Record<DocumentTypeId, string> = {
  complaint: "/document/complaint",
  brief: "/document/brief",
  evidence: "/document/evidence",
  petition: "/document/petition",
};

export default function DocumentPage() {
  const navigate = useNavigate();
  const [activeSource, setActiveSource] = useState<DocumentSource>("case");
  const { cases, selectedCaseId, selectedCase, setSelectedCaseId, selectNewlyCreatedCase } =
    useDocumentCases(activeSource);
  const caseModal = useModal();
  const newCaseModal = useModal();

  const changeSource = (source: DocumentSource) => {
    if (source === "case") caseModal.open();
    else setActiveSource(source);
  };

  const confirmCase = (id: number) => {
    setSelectedCaseId(id);
    setActiveSource("case");
    caseModal.close();
  };

  const handleCreated = async () => {
    await selectNewlyCreatedCase();
    newCaseModal.close();
  };

  const pickType = (id: DocumentTypeId) => {
    const query = activeSource === "case" && selectedCaseId ? `?caseId=${selectedCaseId}` : "";
    navigate(`${ROUTE_BY_TYPE[id]}${query}`);
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <DocumentHeader activeSource={activeSource} selectedCase={selectedCase} onChangeSource={changeSource} />

      {caseModal.isOpen && (
        <CaseSelectModal
          key={selectedCaseId}
          cases={cases}
          selectedId={selectedCaseId}
          onClose={caseModal.close}
          onCreate={newCaseModal.open}
          onConfirm={confirmCase}
        />
      )}

      {newCaseModal.isOpen && <NewCaseModal onClose={newCaseModal.close} onCreated={handleCreated} />}

      <DocumentTypeSelector onPick={pickType} />
      <DocumentQuickLinks />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <RecentDocumentsList />
        <DocumentTips />
      </div>
    </div>
  );
}
