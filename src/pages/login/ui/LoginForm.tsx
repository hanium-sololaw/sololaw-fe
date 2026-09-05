import { Link } from "react-router-dom";
import { useLoginForm } from "@/pages/login/hook/useLoginForm";
import { FormButton } from "@/shared/ui/FormButton";
import { FormInput } from "@/shared/ui/FormInput";
import { Logo } from "@/shared/ui/Logo";

export default function LoginForm() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    keepLogin,
    setKeepLogin,
    loginError,
    handleSubmit,
  } = useLoginForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[460px] flex-col gap-8 px-10 py-12"
    >
      <div className="flex justify-center">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        <FormInput
          label="아이디"
          placeholder="아이디를 입력해주세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={loginError}
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
        {/* <Link to="#" className="text-sm text-blue-400">
          비밀번호 찾기
        </Link> */}
      </div>

      <FormButton type="submit" className="w-full rounded-xl py-4 text-base">
        로그인
      </FormButton>

      <p className="text-center text-sm text-gray-500">
        <span className="mr-[10px]">계정이 없으신가요?</span>
        <Link to="/signup" className="text-blue-400">
          회원가입
        </Link>
      </p>
    </form>
  );
}
