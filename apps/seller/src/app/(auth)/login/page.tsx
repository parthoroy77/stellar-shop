import LoginForm from "@/app/(auth)/components/login-form";
import AuthLayout from "../components/auth-layout";

const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="space-y-1">
        <h1 className="text-2xl font-medium">Welcome Back!</h1>
        <p className="text-accent-foreground text-sm">Login and manage your store!</p>
      </div>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
