import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type {
  ApiEnvelope,
  ScheduleEventTime,
  ScheduleRecord,
  ScheduleType,
} from "./types";

export type CreateScheduleRequest = {
  caseId?: number;
  title: string;
  scheduleType: ScheduleType;
  eventDate: string;
  eventTime?: ScheduleEventTime;
  location?: string;
  memo?: string;
  reminderEnabled?: boolean;
  reminderValue?: number;
  reminderUnit?: string;
};

export async function createSchedule(
  body: CreateScheduleRequest,
): Promise<ScheduleRecord> {
  const response = await apiClient<ApiEnvelope<ScheduleRecord>>(
    "/api/schedules",
    withAuth({
      method: "POST",
      body: JSON.stringify(body),
    }),
  );

  return response.data;
}
