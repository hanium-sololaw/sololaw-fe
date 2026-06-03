import { Link } from "react-router-dom";
import { useSignupForm } from "@/pages/signup/hook/useSignupForm";
import { FormButton } from "@/shared/ui/FormButton";
import { FormInput } from "@/shared/ui/FormInput";
import { Logo } from "@/shared/ui/Logo";

export default function SignupForm() {
  const {
    name, setName,
    email, emailError, handleEmailChange, handleEmailBlur,
    username, usernameError, setUsername, setUsernameError,
    password, passwordError, handlePasswordChange, handlePasswordBlur,
    passwordConfirm, setPasswordConfirm,
    passwordConfirmError, passwordConfirmSuccess,
    agreed, setAgreed,
    handleSubmit,
  } = useSignupForm();

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
          label="이름"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="이메일"
          type="text"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          onBlur={handleEmailBlur}
          error={emailError}
        />
        <FormInput
          label="아이디"
          placeholder="아이디를 입력해주세요"
          value={username}
          onChange={(e) => { setUsername(e.target.value); setUsernameError(""); }}
          error={usernameError}
        />
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="8자 이상, 영문+숫자 조합으로 입력해주세요"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          onBlur={handlePasswordBlur}
          error={passwordError}
        />
        <FormInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 재입력"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          error={passwordConfirmError}
          success={passwordConfirmSuccess}
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

      <FormButton
        type="submit"
        className="w-full rounded-xl py-4 text-base disabled:opacity-50"
        disabled={!agreed}
      >
        회원가입
      </FormButton>

      <p className="text-center text-sm text-gray-500">
        <span className="mr-[10px]">이미 계정이 있으신가요?</span>
        <Link to="/login" className="font-medium text-blue-400">
          로그인
        </Link>
      </p>
    </form>
  );
}
