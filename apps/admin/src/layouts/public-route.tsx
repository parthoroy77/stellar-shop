import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace={true} />; // Redirect if authenticated
  }

  return children; // Render children if not authenticated
};

export default PublicRoute;
