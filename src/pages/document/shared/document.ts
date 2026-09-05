export type { ApiEnvelope } from "@/shared/api/types";

export type DocType = "COMPLAINT" | "ANSWER" | "BRIEF" | "EVIDENCE_LIST" | "APPLICATION";

export type DocumentStatus = "DRAFT" | "SCHEDULED_TO_SUBMIT" | "SUBMITTED" | "NEEDS_REVISION";

export type Document = {
  id: number;
  caseId: number;
  docType: DocType;
  applicationSubtype?: string;
  title: string;
  status: DocumentStatus;
  isLatest: boolean;
  writingRate: number;
  generatedAt: string;
  createdAt: string;
  modifiedAt: string;
};

