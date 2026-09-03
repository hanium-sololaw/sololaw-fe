import { apiClient } from "@/shared/api/client";
import { withAuth } from "@/shared/api/interceptors";
import type { ApiEnvelope, UserProfile } from "./types";

export async function getMyProfile(): Promise<UserProfile> {
  const response = await apiClient<ApiEnvelope<UserProfile>>(
    "/api/users/me",
    withAuth({ method: "GET" }),
  );

  return response.data;
}
