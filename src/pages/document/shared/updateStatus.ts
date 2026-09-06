import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope, Document, DocumentStatus } from "./document";

/** Changes a document's submission status. PATCH /api/documents/{documentId}/status. */
export async function updateDocumentStatus(documentId: number, status: DocumentStatus): Promise<Document> {
  const response = await apiClient<ApiEnvelope<Document>>(`/api/documents/${documentId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return response.data;
}
