import LoginForm from "@/components/forms/login-form";
import { Container } from "@ui/index";
import AuthSidebar from "../components/auth-sidebar";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full items-center">
      <AuthSidebar />
      <Container className="flex h-full w-[40%] flex-col justify-center gap-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium">Welcome Back!</h1>
          <p className="text-accent-foreground text-sm">Login and manage your store!</p>
        </div>
        <LoginForm />
      </Container>
    </div>
  );
};

export default LoginPage;
