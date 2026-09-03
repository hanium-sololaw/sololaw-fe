import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope, UserProfile } from "./types";

export type UpdateMyProfileRequest = {
  name?: string;
  email?: string;
  loginId?: string;
};

export async function updateMyProfile(
  body: UpdateMyProfileRequest,
): Promise<UserProfile> {
  const response = await apiClient<ApiEnvelope<UserProfile>>(
    "/api/users/me",
    withAuth({
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  );

  return response.data;
}
