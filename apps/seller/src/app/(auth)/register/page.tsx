import RegisterForm from "@/app/(auth)/components/register-form";
import AuthLayout from "../components/auth-layout";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <div className="space-y-1">
        <h1 className="text-2xl font-medium">Greetings!</h1>
        <p className="text-accent-foreground text-sm">Join us and level up store!</p>
      </div>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
