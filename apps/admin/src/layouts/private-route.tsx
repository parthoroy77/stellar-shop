import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    <Navigate to={"/login"} replace={true} />;
  } else {
    return children;
  }
};

export default PrivateRoute;
