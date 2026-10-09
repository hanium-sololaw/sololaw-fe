import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope, Document, DocType } from "./document";

type CreateDraftRequest = {
  docType: DocType;
  applicationSubtype?: string;
  title?: string;
  content: unknown;
  writingRate?: number;
};

export async function createDocumentDraft(caseId: number, request: CreateDraftRequest): Promise<Document> {
  const response = await apiClient<ApiEnvelope<Document>>(`/api/cases/${caseId}/documents`, {
    method: "POST",
    body: JSON.stringify(request),
  });
  return response.data;
}
