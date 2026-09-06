import { apiClient } from './client'
import type { ApiEnvelope } from './types'

export type UserProfile = {
  name: string
  email: string
  loginId: string
  role: string
  createdAt: string
}

/** Fetches the logged-in user's profile. GET /api/users/me. */
export async function getMyProfile(): Promise<UserProfile> {
  const response = await apiClient<ApiEnvelope<UserProfile>>('/api/users/me')
  return response.data
}
