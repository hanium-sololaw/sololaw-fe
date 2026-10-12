import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope, ScheduleRecord } from "./types";
import type { CreateScheduleRequest } from "./createSchedule";

/** The case can't be changed — the PATCH body has no caseId. */
export type UpdateScheduleRequest = Omit<CreateScheduleRequest, "caseId">;

/** Updates a schedule; null/omitted fields are left unchanged. PATCH /api/schedules/{scheduleId}. */
export async function updateSchedule(
  scheduleId: number,
  body: UpdateScheduleRequest,
): Promise<ScheduleRecord> {
  const response = await apiClient<ApiEnvelope<ScheduleRecord>>(
    `/api/schedules/${scheduleId}`,
    {
      method: "PATCH",
      body: JSON.stringify(body),
    },
  );

  return response.data;
}
