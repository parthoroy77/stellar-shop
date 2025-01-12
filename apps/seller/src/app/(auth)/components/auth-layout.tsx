import { Button, Container } from "@ui/index";
import Link from "next/link";
import { ReactNode } from "react";
import AuthSidebar from "./auth-sidebar";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-full items-center">
      <AuthSidebar />
      <Container className="relative flex h-full flex-col justify-center gap-5 lg:w-[40%]">
        {children}
        <Link href={"/"}>
          <Button variant={"link"} type="button" className="absolute top-10 h-fit p-0 lg:left-10" size={"sm"}>
            <span>Back to home</span>
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default AuthLayout;
