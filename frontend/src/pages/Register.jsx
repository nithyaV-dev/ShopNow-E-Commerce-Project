import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthForm } from "./Login";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (e) {
      setError(e.response?.data?.message || "Registration failed");
    }
  }

  return <AuthForm title="Create account" subtitle="Join ShopNow today." submit={submit} error={error}
    fields={
      <>
        <label>Full name<input value={form.name} onChange={e => setForm({...form, name:e.target.value})} required /></label>
        <label>Email<input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required /></label>
        <label>Password<input type="password" minLength="6" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required /></label>
      </>
    } footer={<>Already have an account? <Link to="/login">Login</Link></>}/>;
}
