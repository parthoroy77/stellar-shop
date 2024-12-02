import { Container } from "@ui/index";
import { ReactNode } from "react";
import AuthSidebar from "./components/auth-sidebar";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-full items-center">
      <AuthSidebar />
      <Container className="flex h-full w-[40%] flex-col justify-center gap-5">{children}</Container>
    </div>
  );
};

export default AuthLayout;
