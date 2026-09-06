import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope, TodoRecord } from "./types";

export type GetAllTodosQuery = {
  caseId?: number;
  isDone?: boolean;
};

export async function getAllTodos(
  query: GetAllTodosQuery = {},
): Promise<TodoRecord[]> {
  const params = new URLSearchParams();
  if (query.caseId !== undefined) params.set("caseId", String(query.caseId));
  if (query.isDone !== undefined) params.set("isDone", String(query.isDone));

  const queryString = params.toString();
  const response = await apiClient<ApiEnvelope<TodoRecord[]>>(
    `/api/todos${queryString ? `?${queryString}` : ""}`,
    withAuth({ method: "GET" }),
  );

  return response.data;
}
