import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope, Document, DocType, DocumentStatus } from "./document";

type ListDocumentsParams = {
  caseId?: number;
  docType?: DocType;
  status?: DocumentStatus;
  isLatest?: boolean;
  page?: number;
  size?: number;
  sort?: string;
};

type DocumentPage = {
  content: Document[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

/** Lists the current user's documents, optionally filtered. GET /api/documents. */
export async function listDocuments(params: ListDocumentsParams = {}): Promise<DocumentPage> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) query.set(key, String(value));
  }
  const qs = query.toString();
  const response = await apiClient<ApiEnvelope<DocumentPage>>(`/api/documents${qs ? `?${qs}` : ""}`);
  return response.data;
}
