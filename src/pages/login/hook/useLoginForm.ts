import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/pages/login/api/login";

export function useLoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);
  const [loginError, setLoginError] = useState("");

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setLoginError("");
    try {
      await login({ loginId: username, password, rememberMe: keepLogin });
      navigate("/dashboard");
    } catch {
      setLoginError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  }

  return {
    username, setUsername,
    password, setPassword,
    keepLogin, setKeepLogin,
    loginError,
    handleSubmit,
  };
}
