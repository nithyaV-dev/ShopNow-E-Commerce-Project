import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-center">Loading...</div>;
  return user ? <Outlet/> : <Navigate to="/login" replace />;
}

export function AdminRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-center">Loading...</div>;
  return user?.isAdmin ? <Outlet/> : <Navigate to="/" replace />;
}
