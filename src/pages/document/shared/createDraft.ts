import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope, Document, DocType } from "./document";

type CreateDraftRequest = {
  docType: DocType;
  applicationSubtype?: string;
  title?: string;
  content: unknown;
  writingRate?: number;
};

/**
 * Creates a document draft for a case (POST /api/cases/{caseId}/documents). The backend demotes
 * any existing latest draft of the same caseId+docType to isLatest=false.
 *
 * Not wired into any wizard yet: no wizard currently has a real caseId (case-selection UI is
 * unbuilt), and docType/applicationSubtype enum values beyond COMPLAINT/PAYMENT_ORDER are unverified.
 */
export async function createDocumentDraft(caseId: number, request: CreateDraftRequest): Promise<Document> {
  const response = await apiClient<ApiEnvelope<Document>>(`/api/cases/${caseId}/documents`, {
    method: "POST",
    body: JSON.stringify(request),
  });
  return response.data;
}
