import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope } from "./document";

export async function deleteDocument(documentId: number): Promise<void> {
  await apiClient<ApiEnvelope<unknown>>(`/api/documents/${documentId}`, { method: "DELETE" });
}
