import LoginForm from "@/components/forms/login-form";

const LoginPage = () => {
  return (
    <section className="flex h-screen divide-x">
      <div className="hidden lg:block lg:w-[65%]">
        <img src="/login-vector.jpg" alt="Login page graphic image" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3 p-8 *:w-full lg:w-[35%]">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Login.</h1>
          <h5 className="text-accent-foreground text-sm">Please sign-in with valid admin credentials</h5>
        </div>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
