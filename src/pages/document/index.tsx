import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentHeader, { type DocumentSource } from "./ui/DocumentHeader";
import DocumentTypeSelector from "./ui/DocumentTypeSelector";
import DocumentQuickLinks from "./ui/DocumentQuickLinks";
import RecentDocumentsList from "./ui/RecentDocumentsList";
import DocumentTips from "./ui/DocumentTips";
import type { DocumentTypeId } from "./data/documentTypes";
import CaseSelectModal from "./ui/CaseSelectModal";
import NewCaseModal from "@/pages/case-management/ui/NewCaseModal";
import { useModal } from "@/shared/hooks/useModal";
import { listMyCases, type Case } from "@/shared/api/cases";

const ROUTE_BY_TYPE: Record<DocumentTypeId, string> = {
  complaint: "/document/complaint",
  brief: "/document/brief",
  evidence: "/document/evidence",
  petition: "/document/petition",
};

export default function DocumentPage() {
  const navigate = useNavigate();
  const [activeSource, setActiveSource] = useState<DocumentSource>("case");
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const caseModal = useModal();
  const newCaseModal = useModal();
  const selectedCase = cases.find((c) => c.id === selectedCaseId);

  const loadCases = useCallback(
    () =>
      listMyCases()
        .then((result) => {
          setCases(result.content);
          return result.content;
        })
        .catch(() => {
          setCases([]);
          return [] as Case[];
        }),
    [],
  );

  useEffect(() => {
    if (activeSource !== "case") return;
    void loadCases().then((list) => setSelectedCaseId((prev) => prev ?? list[0]?.id ?? null));
  }, [activeSource, loadCases]);

  // 새로 만든 사건(기존 목록에 없던 사건)을 바로 선택한다.
  const handleCreated = async () => {
    const known = new Set(cases.map((c) => c.id));
    const list = await loadCases();
    const created = list.find((c) => !known.has(c.id));
    if (created) setSelectedCaseId(created.id);
    newCaseModal.close();
  };

  const handlePick = (id: DocumentTypeId) => {
    const query = activeSource === "case" && selectedCaseId ? `?caseId=${selectedCaseId}` : "";
    navigate(`${ROUTE_BY_TYPE[id]}${query}`);
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <DocumentHeader
        activeSource={activeSource}
        selectedCase={selectedCase}
        onChangeSource={(source) => {
          if (source === "case") caseModal.open();
          else setActiveSource(source);
        }}
      />

      {caseModal.isOpen && (
        <CaseSelectModal
          key={selectedCaseId}
          cases={cases}
          selectedId={selectedCaseId}
          onClose={caseModal.close}
          onCreate={newCaseModal.open}
          onConfirm={(id) => {
            setSelectedCaseId(id);
            setActiveSource("case");
            caseModal.close();
          }}
        />
      )}

      {newCaseModal.isOpen && <NewCaseModal onClose={newCaseModal.close} onCreated={handleCreated} />}

      <DocumentTypeSelector onPick={handlePick} />

      <DocumentQuickLinks />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <RecentDocumentsList />
        <DocumentTips />
      </div>
    </div>
  );
}
