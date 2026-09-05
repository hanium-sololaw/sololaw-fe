import { apiClient } from "./client";
import type { ApiEnvelope } from "./types";

export type CaseType = "LOAN" | "DEPOSIT" | "WAGE" | "TORT" | "EVICTION";
export type CaseStatus = "PREPARING" | "SUBMISSION_READY" | "FILED" | "IN_PROGRESS" | "CLOSED";
export type FilingMethod = "ELECTRONIC" | string;

export type Case = {
  id: number;
  caseNumber: string;
  title: string;
  caseType: CaseType;
  status: CaseStatus;
  progressRate: number;
  court: string;
  claimAmount: number;
  openedAt: string;
  filingMethod: FilingMethod;
  createdAt: string;
  modifiedAt: string;
};


type ListCasesParams = {
  status?: CaseStatus;
  caseType?: CaseType;
  page?: number;
  size?: number;
  sort?: string;
};

type CasePage = {
  content: Case[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

/** Lists the current user's cases, optionally filtered. GET /api/cases. */
export async function listMyCases(params: ListCasesParams = {}): Promise<CasePage> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) query.set(key, String(value));
  }
  const qs = query.toString();
  const response = await apiClient<ApiEnvelope<CasePage>>(`/api/cases${qs ? `?${qs}` : ""}`);
  return response.data;
}

type CreateCaseRequest = {
  title: string;
  caseType?: CaseType;
  opponentName: string;
  claimAmount?: number;
  court?: string;
  caseNumber?: string;
  startingStage?: string;
};

/**
 * Creates a case. The opponent (defendant) and the logged-in user (plaintiff) are auto-created as
 * parties; if caseType is given, the standard 6-stage procedure is seeded from startingStage.
 * POST /api/cases.
 */
export async function createCase(request: CreateCaseRequest): Promise<Case> {
  const response = await apiClient<ApiEnvelope<Case>>("/api/cases", {
    method: "POST",
    body: JSON.stringify(request),
  });
  return response.data;
}

export type PartyRole = "PLAINTIFF" | "DEFENDANT" | string;

export type CaseParty = {
  id: number;
  partyRole: PartyRole;
  name: string;
  isSelf: boolean;
};

export type CaseActivity = {
  description: string;
  createdAt: string;
};

export type CaseDetail = Case & {
  parties: CaseParty[];
  documentCount: number;
  evidenceCount: number;
  scheduleCount: number;
  recentActivityCount: number;
  recentActivities: CaseActivity[];
};

/**
 * Fetches case detail: case info + party summary + progress + document/evidence/schedule/activity
 * counts + the 5 most recent activities. GET /api/cases/{caseId}.
 */
export async function getCaseDetail(caseId: number): Promise<CaseDetail> {
  const response = await apiClient<ApiEnvelope<CaseDetail>>(`/api/cases/${caseId}`);
  return response.data;
}

/** Deletes a case (parties/procedure stages/to-dos cascade). DELETE /api/cases/{caseId}. */
export async function deleteCase(caseId: number): Promise<void> {
  await apiClient<ApiEnvelope<unknown>>(`/api/cases/${caseId}`, { method: "DELETE" });
}

type UpdateCaseRequest = {
  title?: string | null;
  caseType?: CaseType | null;
  claimAmount?: number | null;
  court?: string | null;
  caseNumber?: string | null;
  filingMethod?: FilingMethod | null;
};

/**
 * Updates a case's fields (omitted/null fields are left unchanged). If caseType is filled in for
 * the first time (from unset), the standard 6-stage procedure is auto-seeded from stage 1.
 * PATCH /api/cases/{caseId}.
 */
export async function updateCase(caseId: number, request: UpdateCaseRequest): Promise<Case> {
  const response = await apiClient<ApiEnvelope<Case>>(`/api/cases/${caseId}`, {
    method: "PATCH",
    body: JSON.stringify(request),
  });
  return response.data;
}

/** Changes a case's status with a correction reason (5+ chars). PATCH /api/cases/{caseId}/status. */
export async function updateCaseStatus(caseId: number, status: CaseStatus, reason: string): Promise<Case> {
  const response = await apiClient<ApiEnvelope<Case>>(`/api/cases/${caseId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status, reason }),
  });
  return response.data;
}
