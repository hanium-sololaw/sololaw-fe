import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope, ScheduleRecord, ScheduleType } from "./types";

export type GetSchedulesQuery = {
  caseId?: number;
  scheduleType?: ScheduleType;
  from?: string;
  to?: string;
};

export async function getSchedules(
  query: GetSchedulesQuery = {},
): Promise<ScheduleRecord[]> {
  const params = new URLSearchParams();
  if (query.caseId !== undefined) params.set("caseId", String(query.caseId));
  if (query.scheduleType) params.set("scheduleType", query.scheduleType);
  if (query.from) params.set("from", query.from);
  if (query.to) params.set("to", query.to);

  const queryString = params.toString();
  const response = await apiClient<ApiEnvelope<ScheduleRecord[]>>(
    `/api/schedules${queryString ? `?${queryString}` : ""}`,
    withAuth({ method: "GET" }),
  );

  return response.data;
}
