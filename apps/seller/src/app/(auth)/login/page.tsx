import LoginForm from "@/components/forms/login-form";

const LoginPage = () => {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-2xl font-medium">Welcome Back!</h1>
        <p className="text-accent-foreground text-sm">Login and manage your store!</p>
      </div>
      <LoginForm />
    </>
  );
};

export default LoginPage;
