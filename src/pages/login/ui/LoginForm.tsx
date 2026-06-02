import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '@/pages/login/api/login'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Logo } from '@/shared/ui/Logo'
import { ROUTES } from '@/shared/constants/routes'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [keepLogin, setKeepLogin] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await login({ username, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[460px] flex-col gap-8 px-10 py-12">
      <div className="flex justify-center">
        <Logo />
      </div>

      <div className="flex flex-col gap-8">
        <Input
          label="아이디"
          placeholder="아이디를 입력해주세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-500">
          <input
            type="checkbox"
            checked={keepLogin}
            onChange={(e) => setKeepLogin(e.target.checked)}
            className="h-4 w-4 accent-blue-400"
          />
          로그인 상태 유지
        </label>
        <Link to="#" className="text-sm text-blue-400">
          비밀번호 찾기
        </Link>
      </div>

      <Button type="submit" className="w-full rounded-xl py-4 text-base">
        로그인
      </Button>

      <p className="text-center text-sm text-gray-500">
        계정이 없으신가요?{' '}
        <Link to={ROUTES.SIGNUP} className="font-medium text-blue-400">
          회원가입
        </Link>
      </p>
    </form>
  )
}
