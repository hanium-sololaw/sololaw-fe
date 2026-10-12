import { apiClient } from "@/shared/api/client";
import type { ApiEnvelope } from "@/shared/api/types";

export type NotificationSettingsResponse = {
  hearingReminderAlert: boolean;
  submissionDeadlineAlert: boolean;
  aiPrecedentAlert: boolean;
  overdueDeadlineAlert: boolean;
  evidenceSupplementAlert: boolean;
};

export type NotificationSettingKey = keyof NotificationSettingsResponse;

/** Fetches the logged-in user's notification settings. GET /api/notification-settings. */
export async function getNotificationSettings(): Promise<NotificationSettingsResponse> {
  const response = await apiClient<ApiEnvelope<NotificationSettingsResponse>>(
    "/api/notification-settings",
  );
  return response.data;
}

/** Updates notification settings; omitted fields are left unchanged. PATCH /api/notification-settings. */
export async function updateNotificationSettings(
  body: Partial<NotificationSettingsResponse>,
): Promise<NotificationSettingsResponse> {
  const response = await apiClient<ApiEnvelope<NotificationSettingsResponse>>(
    "/api/notification-settings",
    {
      method: "PATCH",
      body: JSON.stringify(body),
    },
  );
  return response.data;
}
