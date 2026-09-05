export type EvidenceSubmitterRole = "plaintiff" | "defendant" | "intervenor";
export type OriginalType = "copy" | "original";

export type EvidenceItem = {
  id: string;
  name: string;
  author: string;
  date: string;
  purpose: string;
  originalType: OriginalType;
  branchNo: string;
  note: string;
};

export function emptyEvidenceItem(): EvidenceItem {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    author: "",
    date: "",
    purpose: "",
    originalType: "copy",
    branchNo: "",
    note: "",
  };
}

export type EvidenceListForm = {
  court: string;
  panel: string;
  caseNo: string;
  plaintiff: string;
  defendant: string;
  submitterRole: EvidenceSubmitterRole;
  evidenceStartNo: string;
  items: EvidenceItem[];
};

export const emptyEvidenceListForm: EvidenceListForm = {
  court: "",
  panel: "",
  caseNo: "",
  plaintiff: "",
  defendant: "",
  submitterRole: "plaintiff",
  evidenceStartNo: "1",
  items: [emptyEvidenceItem()],
};
