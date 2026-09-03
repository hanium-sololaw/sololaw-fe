import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope } from "./types";

export async function deleteCase(caseId: number | string): Promise<void> {
  await apiClient<ApiEnvelope<Record<string, never>>>(
    `/api/cases/${caseId}`,
    withAuth({ method: "DELETE" }),
  );
}
