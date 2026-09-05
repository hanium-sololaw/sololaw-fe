import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope } from "./document";

/** Deletes a document (its generation log cascades). DELETE /api/documents/{documentId}. */
export async function deleteDocument(documentId: number): Promise<void> {
  await apiClient<ApiEnvelope<unknown>>(`/api/documents/${documentId}`, { method: "DELETE" });
}
