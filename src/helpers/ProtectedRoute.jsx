import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children,role }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role) {

    return user?.role == role?  children :  <Navigate to="/notfound" replace />
  }

  return children;
};

export default ProtectedRoute;
