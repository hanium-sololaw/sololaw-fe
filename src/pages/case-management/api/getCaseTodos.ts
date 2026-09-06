import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope } from "@/shared/api/types";
import type { TodoRecord } from "./types";

export async function getCaseTodos(
  caseId: number | string,
): Promise<TodoRecord[]> {
  const response = await apiClient<ApiEnvelope<TodoRecord[]>>(
    `/api/cases/${caseId}/todos`,
    withAuth({ method: "GET" }),
  );

  return response.data;
}
