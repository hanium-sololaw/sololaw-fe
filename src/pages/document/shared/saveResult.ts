import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope, Document } from "./document";

/** Persists the RAG SSE `done` result (raw_text + sections) via POST /api/documents/{documentId}/result. */
export async function saveDocumentResult(
  documentId: number,
  generatedText: string,
  generatedContent: unknown,
): Promise<Document> {
  const response = await apiClient<ApiEnvelope<Document>>(`/api/documents/${documentId}/result`, {
    method: "POST",
    body: JSON.stringify({ generatedText, generatedContent }),
  });
  return response.data;
}
