import { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  useEffect(() => {
    document.body.style.background = "#e6e6e6";
  });

  return (
    <section className="form-container grid">
      <h3>
        Create your Stack Underflow account. It’s free and only takes a minute.
      </h3>
      <form onSubmit={handleSubmit} className="form-style">
        <label>Email Address</label>
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
          Sign up
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      <span>Already have an account? Log in</span>
    </section>
  );
};

export default Signup;
