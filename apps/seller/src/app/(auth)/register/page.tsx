import RegisterForm from "@/app/(auth)/components/register-form";

const RegisterPage = () => {
  return (
    <>
      <div className="space-y-1">
        <h1 className="text-2xl font-medium">Greetings!</h1>
        <p className="text-accent-foreground text-sm">Join us and level up store!</p>
      </div>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
