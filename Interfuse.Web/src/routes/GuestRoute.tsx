import { Navigate } from "react-router-dom";
import React, { ReactNode } from "react";

import { useAuth } from "../contexts/AuthContext";

interface GuestRouteProps {
  children: ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default GuestRoute;
