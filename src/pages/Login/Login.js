import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <section className="form-container grid">
      <form onSubmit={handleSubmit} className="form-style">
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading} className="button">
          Log in
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      <span>Don't have an account? Sign up</span>
    </section>
  );
};

export default Login;
