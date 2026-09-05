import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentHeader, { type DocumentSource } from "./ui/DocumentHeader";
import DocumentTypeSelector from "./ui/DocumentTypeSelector";
import DocumentQuickLinks from "./ui/DocumentQuickLinks";
import RecentDocumentsList from "./ui/RecentDocumentsList";
import DocumentTips from "./ui/DocumentTips";
import type { DocumentTypeId } from "./data/documentTypes";
import Dropdown from "@/shared/ui/Dropdown";
import { listMyCases, type Case } from "@/shared/api/cases";

const ROUTE_BY_TYPE: Record<DocumentTypeId, string> = {
  complaint: "/document/complaint",
  brief: "/document/brief",
  evidence: "/document/evidence",
  petition: "/document/petition",
};

function CaseOption({ item }: { item: Case }) {
  return (
    <p className="text-gray-800">
      {item.title} <span className="text-gray-400">· {item.caseNumber}</span>
    </p>
  );
}

export default function DocumentPage() {
  const navigate = useNavigate();
  const [activeSource, setActiveSource] = useState<DocumentSource>("case");
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);

  useEffect(() => {
    if (activeSource !== "case") return;
    listMyCases()
      .then((result) => {
        setCases(result.content);
        setSelectedCaseId((prev) => prev ?? result.content[0]?.id ?? null);
      })
      .catch(() => setCases([]));
  }, [activeSource]);

  const handlePick = (id: DocumentTypeId) => {
    const query = activeSource === "case" && selectedCaseId ? `?caseId=${selectedCaseId}` : "";
    navigate(`${ROUTE_BY_TYPE[id]}${query}`);
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <DocumentHeader
        activeSource={activeSource}
        onChangeSource={setActiveSource}
      />

      {activeSource === "case" && (
        <div className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm font-semibold text-gray-700">문서를 만들 사건</p>
          {cases.length === 0 ? (
            <p className="text-sm text-gray-400">등록된 사건이 없어요. 판례 검색 페이지에서 먼저 사건을 등록해주세요.</p>
          ) : (
            selectedCaseId !== null && (
              <Dropdown<number>
                value={selectedCaseId}
                options={cases.map((item) => item.id)}
                onChange={setSelectedCaseId}
                renderValue={(id) => <CaseOption item={cases.find((c) => c.id === id)!} />}
                renderOption={(id) => <CaseOption item={cases.find((c) => c.id === id)!} />}
                placeholder="사건을 선택해주세요"
              />
            )
          )}
        </div>
      )}

      <DocumentTypeSelector onPick={handlePick} />

      <DocumentQuickLinks />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <RecentDocumentsList />
        <DocumentTips />
      </div>
    </div>
  );
}
