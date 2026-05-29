import { FormEvent, useState } from 'react'
import { login } from '@/pages/login/api/login'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await login({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-80 flex-col gap-4">
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">로그인</Button>
    </form>
  )
}
