import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope, Document, DocumentStatus } from "./document";

export async function updateDocumentStatus(documentId: number, status: DocumentStatus): Promise<Document> {
  const response = await apiClient<ApiEnvelope<Document>>(`/api/documents/${documentId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return response.data;
}
