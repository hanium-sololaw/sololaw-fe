import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'

export async function checkLoginIdAvailable(loginId: string): Promise<boolean> {
  const response = await apiClient<ApiEnvelope<{ available: boolean }>>(
    `/api/auth/check-login-id?loginId=${encodeURIComponent(loginId)}`,
  )
  return response.data.available
}

export async function checkEmailAvailable(email: string): Promise<boolean> {
  const response = await apiClient<ApiEnvelope<{ available: boolean }>>(
    `/api/auth/check-email?email=${encodeURIComponent(email)}`,
  )
  return response.data.available
}
