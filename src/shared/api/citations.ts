import { apiClient } from "./client";
import type { ApiEnvelope } from "./types";

export type PrecedentCategory = "CIVIL" | string;

export type PrecedentCitation = {
  id: number;
  serialId: string;
  name: string;
  caseNo: string;
  court: string;
  decisionDate: string;
  category: PrecedentCategory;
  referenceNote?: string;
  detailUrl?: string;
  caseId?: number;
  documentId?: number;
  citedAt: string;
  createdAt: string;
  modifiedAt: string;
};


type ListCitationsParams = {
  caseId?: number;
  documentId?: number;
};

/** Lists the current user's cited precedents, optionally filtered. GET /api/precedent-citations. */
export async function listMyCitations(params: ListCitationsParams = {}): Promise<PrecedentCitation[]> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) query.set(key, String(value));
  }
  const qs = query.toString();
  const response = await apiClient<ApiEnvelope<PrecedentCitation[]>>(`/api/precedent-citations${qs ? `?${qs}` : ""}`);
  return response.data;
}

type CreateCitationRequest = {
  serialId: string;
  name: string;
  caseNo: string;
  court: string;
  decisionDate: string;
  category: PrecedentCategory;
  referenceNote?: string;
  detailUrl?: string;
  caseId: number;
  documentId?: number;
};

/**
 * Adds a cited precedent. caseId is required; documentId is optional and can be linked later via
 * PATCH once document generation is confirmed. POST /api/precedent-citations.
 */
export async function createCitation(request: CreateCitationRequest): Promise<PrecedentCitation> {
  const response = await apiClient<ApiEnvelope<PrecedentCitation>>("/api/precedent-citations", {
    method: "POST",
    body: JSON.stringify(request),
  });
  return response.data;
}

/** Deletes a cited precedent. DELETE /api/precedent-citations/{citationId}. */
export async function deleteCitation(citationId: number): Promise<void> {
  await apiClient<ApiEnvelope<unknown>>(`/api/precedent-citations/${citationId}`, { method: "DELETE" });
}

/** Links a citation to a document once generation is confirmed. PATCH /api/precedent-citations/{citationId}. */
export async function linkCitationToDocument(citationId: number, documentId: number): Promise<PrecedentCitation> {
  const response = await apiClient<ApiEnvelope<PrecedentCitation>>(`/api/precedent-citations/${citationId}`, {
    method: "PATCH",
    body: JSON.stringify({ documentId }),
  });
  return response.data;
}
