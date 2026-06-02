import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '@/pages/signup/api/signup'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Logo } from '@/shared/ui/Logo'
import { ROUTES } from '@/shared/constants/routes'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [agreed, setAgreed] = useState(false)

  function handleEmailChange(value: string) {
    setEmail(value)
    if (emailError && isValidEmail(value)) setEmailError('')
  }

  function handleEmailBlur() {
    if (email && !isValidEmail(email)) {
      setEmailError('이메일 형식이 맞지않아요. @ 와 도메인(.com 등)을 확인해주세요')
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setEmailError('이메일 형식이 맞지않아요. @ 와 도메인(.com 등)을 확인해주세요')
      return
    }
    await signup({ name, email, username, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[460px] flex-col gap-8 px-10 py-12">
      <div className="flex justify-center">
        <Logo />
      </div>

      <div className="flex flex-col gap-8">
        <Input
          label="이름"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="이메일"
          type="text"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          onBlur={handleEmailBlur}
          error={emailError}
        />
        <Input
          label="아이디"
          placeholder="아이디를 입력해주세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="8자 이상, 영문+숫자 조합으로 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 재입력"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="h-4 w-4 accent-blue-400"
        />
        서비스 이용약관 및 개인정보처리방침에 동의합니다
      </label>

      <Button
        type="submit"
        className="w-full rounded-xl py-4 text-base disabled:opacity-50"
        disabled={!agreed}
      >
        회원가입
      </Button>

      <p className="text-center text-sm text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link to={ROUTES.LOGIN} className="font-medium text-blue-400">
          로그인
        </Link>
      </p>
    </form>
  )
}
