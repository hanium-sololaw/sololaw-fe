import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'

interface SignupRequest {
  name: string
  email: string
  loginId: string
  password: string
  agreeToTerms: boolean
}

export async function signup(body: SignupRequest): Promise<void> {
  await apiClient<ApiEnvelope<Record<string, never>>>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
