// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />; // Redirect to default dashboard
  }

  return children;
};

export default ProtectedRoute;