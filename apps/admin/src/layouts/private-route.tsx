import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/login");
  } else {
    return children;
  }
};

export default PrivateRoute;
