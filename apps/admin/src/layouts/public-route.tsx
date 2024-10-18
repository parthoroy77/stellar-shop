import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate("/");
  } else {
    return children;
  }
};

export default PublicRoute;
