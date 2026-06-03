import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { login } from "@/pages/login/api/login";

export function useLoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    // await login({ username, password });
    navigate("/dashboard");
  }

  return {
    username, setUsername,
    password, setPassword,
    keepLogin, setKeepLogin,
    handleSubmit,
  };
}
