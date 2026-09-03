import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope, TodoRecord } from "./types";

export type UpdateCaseTodoRequest = {
  title?: string;
  dueDate?: string;
  isDone?: boolean;
};

export async function updateCaseTodo(
  caseId: number | string,
  todoId: number | string,
  body: UpdateCaseTodoRequest,
): Promise<TodoRecord> {
  const response = await apiClient<ApiEnvelope<TodoRecord>>(
    `/api/cases/${caseId}/todos/${todoId}`,
    withAuth({
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  );

  return response.data;
}
