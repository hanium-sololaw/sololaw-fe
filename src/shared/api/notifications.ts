import { apiClient } from "./client";
import type { ApiEnvelope } from "./types";

/** Fired after a notification is read/deleted so the header's unread badge refetches. */
export const NOTIFICATIONS_CHANGED_EVENT = "notifications:changed";

export type NotificationType =
  | "DEADLINE"
  | "HEARING"
  | "OPPONENT_FILING"
  | "AI_PRECEDENT"
  | "EVIDENCE_SUPPLEMENT";

export type Notification = {
  id: number;
  relatedCaseId: number | null;
  type: NotificationType;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  modifiedAt: string;
};

type ListNotificationsParams = {
  isRead?: boolean;
  type?: NotificationType;
  page?: number;
  size?: number;
  sort?: string;
};

export type NotificationPage = {
  content: Notification[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

/** Lists the current user's notifications. GET /api/notifications. */
export async function listNotifications(
  params: ListNotificationsParams = {},
): Promise<NotificationPage> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) query.set(key, String(value));
  }
  const qs = query.toString();
  const response = await apiClient<ApiEnvelope<NotificationPage>>(
    `/api/notifications${qs ? `?${qs}` : ""}`,
  );
  return response.data;
}

/** Counts unread notifications. GET /api/notifications/unread-count. */
export async function getUnreadNotificationCount(): Promise<number> {
  const response = await apiClient<ApiEnvelope<number>>(
    "/api/notifications/unread-count",
  );
  return response.data;
}

/** Marks one notification as read. PATCH /api/notifications/{notificationId}/read. */
export async function markNotificationRead(
  notificationId: number,
): Promise<Notification> {
  const response = await apiClient<ApiEnvelope<Notification>>(
    `/api/notifications/${notificationId}/read`,
    { method: "PATCH" },
  );
  return response.data;
}

/** Marks every notification as read; returns how many were updated. PATCH /api/notifications/read-all. */
export async function markAllNotificationsRead(): Promise<number> {
  const response = await apiClient<ApiEnvelope<number>>(
    "/api/notifications/read-all",
    { method: "PATCH" },
  );
  return response.data;
}

/** Deletes a notification. DELETE /api/notifications/{notificationId}. */
export async function deleteNotification(notificationId: number): Promise<void> {
  await apiClient<ApiEnvelope<unknown>>(`/api/notifications/${notificationId}`, {
    method: "DELETE",
  });
}
