import Loader from "@/components/ui/loader";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, error } = useAuth();

  if (isLoading) return <Loader />;

  if (!isAuthenticated || error) {
    return <Navigate to="/login" replace={true} />; // Redirect to login if not authenticated
  }

  return children; // Render protected content if authenticated
};

export default PrivateRoute;
