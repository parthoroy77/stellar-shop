import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="py-10">{children}</div>;
};

export default AuthLayout;
