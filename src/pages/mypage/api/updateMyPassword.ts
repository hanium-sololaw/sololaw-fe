import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope } from "./types";

export type UpdateMyPasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export async function updateMyPassword(
  body: UpdateMyPasswordRequest,
): Promise<void> {
  await apiClient<ApiEnvelope<Record<string, never>>>(
    "/api/users/me/password",
    withAuth({
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  );
}
