import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope, CaseRecord } from "./types";

export type PartyRole = "PLAINTIFF" | "DEFENDANT";

export type CaseParty = {
  id: number;
  partyRole: PartyRole;
  name: string;
  isSelf: boolean;
};

export type RecentActivity = {
  description: string;
  createdAt: string;
};

export type CaseDetailRecord = CaseRecord & {
  parties: CaseParty[];
  documentCount: number;
  evidenceCount: number;
  scheduleCount: number;
  recentActivityCount: number;
  recentActivities: RecentActivity[];
};

export async function fetchCaseDetail(
  caseId: number | string,
): Promise<CaseDetailRecord> {
  const response = await apiClient<ApiEnvelope<CaseDetailRecord>>(
    `/api/cases/${caseId}`,
    withAuth({ method: "GET" }),
  );

  return response.data;
}
