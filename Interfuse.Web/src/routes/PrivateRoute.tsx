import { Navigate } from "react-router-dom";
import React, { ReactNode } from "react";

import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
