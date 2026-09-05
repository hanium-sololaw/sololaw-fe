import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "@/pages/signup/api/signup";
import { checkEmailAvailable, checkLoginIdAvailable } from "@/pages/signup/api/checkAvailability";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(pw: string) {
  return pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw);
}

export function useSignupForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);

  const passwordConfirmError =
    passwordConfirm && password !== passwordConfirm
      ? "비밀번호가 일치하지 않습니다"
      : "";
  const passwordConfirmSuccess =
    passwordConfirm && password === passwordConfirm
      ? "비밀번호가 일치합니다!"
      : "";

  function handleEmailChange(value: string) {
    setEmail(value);
    if (emailError && isValidEmail(value)) setEmailError("");
  }

  async function handleEmailBlur() {
    if (!email) return;
    if (!isValidEmail(email)) {
      setEmailError("이메일 형식이 맞지않아요. @ 와 도메인(.com 등)을 확인해주세요");
      return;
    }
    const available = await checkEmailAvailable(email).catch(() => true);
    if (!available) setEmailError("이미 사용 중인 이메일입니다.");
  }

  async function handleUsernameBlur() {
    if (!username) return;
    const available = await checkLoginIdAvailable(username).catch(() => true);
    if (!available) setUsernameError("이미 동일한 아이디가 존재합니다.");
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    if (passwordError && isValidPassword(value)) setPasswordError("");
  }

  function handlePasswordBlur() {
    if (password && !isValidPassword(password)) {
      setPasswordError("비밀번호는 8자 이상, 영문+숫자 조합으로 구성되어야 합니다.");
    }
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError("이메일 형식이 맞지않아요. @ 와 도메인(.com 등)을 확인해주세요");
      return;
    }
    if (!isValidPassword(password)) {
      setPasswordError("비밀번호는 8자 이상, 영문+숫자 조합으로 구성되어야 합니다.");
      return;
    }
    if (password !== passwordConfirm) return;
    try {
      await signup({ name, email, loginId: username, password, agreeToTerms: agreed });
      navigate("/login");
    } catch (err) {
      if (err instanceof Error && err.message.includes("409")) {
        setUsernameError("이미 동일한 아이디가 존재합니다.");
      }
    }
  }

  return {
    name, setName,
    email, emailError, handleEmailChange, handleEmailBlur,
    username, usernameError, setUsername, setUsernameError, handleUsernameBlur,
    password, passwordError, handlePasswordChange, handlePasswordBlur,
    passwordConfirm, setPasswordConfirm,
    passwordConfirmError, passwordConfirmSuccess,
    agreed, setAgreed,
    handleSubmit,
  };
}
