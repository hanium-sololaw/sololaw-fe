import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'

interface LoginRequest {
  loginId: string
  password: string
  rememberMe: boolean
}

export async function login(body: LoginRequest): Promise<void> {
  await apiClient<ApiEnvelope<Record<string, never>>>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
