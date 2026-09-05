import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope, Document } from "./document";

export type DocumentDetail = Document & {
  content: unknown;
  generatedContent: unknown;
  generatedText: string;
};

/** Fetches full document detail incl. content via GET /api/documents/{documentId}. */
export async function getDocumentDetail(documentId: number): Promise<DocumentDetail> {
  const response = await apiClient<ApiEnvelope<DocumentDetail>>(`/api/documents/${documentId}`);
  return response.data;
}
