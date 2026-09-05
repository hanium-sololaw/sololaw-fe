import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope, Document } from "./document";

type UpdateDraftRequest = {
  title?: string | null;
  content?: unknown;
  writingRate?: number | null;
};

/**
 * Updates a document draft's title/content/writingRate (omitted/null fields are left unchanged).
 * PATCH /api/documents/{documentId}. Rejected with 409 if the generation log is still RUNNING.
 */
export async function updateDocumentDraft(documentId: number, request: UpdateDraftRequest): Promise<Document> {
  const response = await apiClient<ApiEnvelope<Document>>(`/api/documents/${documentId}`, {
    method: "PATCH",
    body: JSON.stringify(request),
  });
  return response.data;
}
