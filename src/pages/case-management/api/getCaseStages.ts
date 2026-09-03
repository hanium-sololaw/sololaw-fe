import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope, StageRecord } from "./types";

export async function getCaseStages(
  caseId: number | string,
): Promise<StageRecord[]> {
  const response = await apiClient<ApiEnvelope<StageRecord[]>>(
    `/api/cases/${caseId}/stages`,
    withAuth({ method: "GET" }),
  );

  return response.data;
}
