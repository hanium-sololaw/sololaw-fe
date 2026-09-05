import { apiClient } from './client'
import type { ApiEnvelope } from './types'

/** Reissues ACCESS_TOKEN/REFRESH_TOKEN (server sets them via cookies). POST /api/auth/refresh. */
export async function refreshToken(): Promise<void> {
  await apiClient<ApiEnvelope<Record<string, never>>>('/api/auth/refresh', { method: 'POST' })
}

/** Expires ACCESS_TOKEN/REFRESH_TOKEN cookies immediately. POST /api/auth/logout. */
export async function logout(): Promise<void> {
  await apiClient<ApiEnvelope<Record<string, never>>>('/api/auth/logout', { method: 'POST' })
}
