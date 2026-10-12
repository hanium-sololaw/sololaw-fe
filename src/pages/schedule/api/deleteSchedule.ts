import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope } from "./types";

/** Deletes a schedule. DELETE /api/schedules/{scheduleId}. */
export async function deleteSchedule(scheduleId: number): Promise<void> {
  await apiClient<ApiEnvelope<unknown>>(`/api/schedules/${scheduleId}`, {
    method: "DELETE",
  });
}
