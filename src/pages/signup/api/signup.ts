import { apiClient } from '@/shared/api/client'

interface SignupRequest {
  name: string
  email: string
  username: string
  password: string
}

interface SignupResponse {
  id: number
}

export async function signup(body: SignupRequest): Promise<SignupResponse> {
  return apiClient<SignupResponse>('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
