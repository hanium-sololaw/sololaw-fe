import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DocumentHeader, { type DocumentSource } from "./ui/DocumentHeader";
import DocumentTypeSelector from "./ui/DocumentTypeSelector";
import DocumentQuickLinks from "./ui/DocumentQuickLinks";
import RecentDocumentsList from "./ui/RecentDocumentsList";
import DocumentTips from "./ui/DocumentTips";
import type { DocumentTypeId } from "./data/documentTypes";

const ROUTE_BY_TYPE: Record<DocumentTypeId, string> = {
  complaint: "/document/complaint",
  brief: "/document/brief",
  evidence: "/document/evidence",
  petition: "/document/petition",
};

export default function DocumentPage() {
  const navigate = useNavigate();
  const [activeSource, setActiveSource] = useState<DocumentSource>("case");

  return (
    <div className="flex flex-col gap-6 pb-6">
      <DocumentHeader
        activeSource={activeSource}
        onChangeSource={setActiveSource}
      />

      <DocumentTypeSelector onPick={(id) => navigate(ROUTE_BY_TYPE[id])} />

      <DocumentQuickLinks />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <RecentDocumentsList />
        <DocumentTips />
      </div>
    </div>
  );
}
