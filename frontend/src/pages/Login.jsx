import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate(location.state?.from || "/");
    } catch (e) {
      setError(e.response?.data?.message || "Login failed");
    }
  }

  return <AuthForm title="Welcome back" subtitle="Login to continue shopping." submit={submit}
    error={error} fields={
      <>
        <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
      </>
    } footer={<>Don't have an account? <Link to="/register">Create one</Link></>}/>;
}

export function AuthForm({ title, subtitle, submit, error, fields, footer }) {
  return <main className="auth-page"><div className="auth-card">
    <span className="eyebrow">Shop<span>Now</span></span>
    <h1>{title}</h1><p>{subtitle}</p>
    {error && <div className="error">{error}</div>}
    <form onSubmit={submit} className="auth-form">{fields}<button className="btn btn-primary full">Continue</button></form>
    <div className="auth-footer">{footer}</div>
  </div></main>;
}
