import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope } from "@/shared/api/types";
import type { ApiStageStatus, StageRecord } from "./types";

export async function updateCaseStageStatus(
  caseId: number | string,
  stageId: number | string,
  status: ApiStageStatus,
): Promise<StageRecord> {
  const response = await apiClient<ApiEnvelope<StageRecord>>(
    `/api/cases/${caseId}/stages/${stageId}/status`,
    withAuth({
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  );

  return response.data;
}
