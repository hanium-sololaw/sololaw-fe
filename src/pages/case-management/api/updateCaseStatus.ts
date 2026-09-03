import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiCaseStatus, ApiEnvelope, CaseRecord } from "./types";

export type UpdateCaseStatusRequest = {
  status: ApiCaseStatus;
  reason: string;
};

export async function updateCaseStatus(
  caseId: number | string,
  body: UpdateCaseStatusRequest,
): Promise<CaseRecord> {
  const response = await apiClient<ApiEnvelope<CaseRecord>>(
    `/api/cases/${caseId}/status`,
    withAuth({
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  );

  return response.data;
}
