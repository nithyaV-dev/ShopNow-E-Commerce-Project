import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return <main className="section"><div className="container narrow">
    <div className="page-heading"><span className="eyebrow">ACCOUNT</span><h1>My Profile</h1></div>
    <div className="profile-card"><div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div><h2>{user?.name}</h2><p>{user?.email}</p><Link className="btn btn-outline" to="/orders">My Orders</Link></div>
  </div></main>;
}
