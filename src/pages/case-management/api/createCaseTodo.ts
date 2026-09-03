import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope, TodoRecord } from "./types";

export type CreateCaseTodoRequest = {
  title: string;
  dueDate?: string;
};

export async function createCaseTodo(
  caseId: number | string,
  body: CreateCaseTodoRequest,
): Promise<TodoRecord> {
  const response = await apiClient<ApiEnvelope<TodoRecord>>(
    `/api/cases/${caseId}/todos`,
    withAuth({
      method: "POST",
      body: JSON.stringify(body),
    }),
  );

  return response.data;
}
