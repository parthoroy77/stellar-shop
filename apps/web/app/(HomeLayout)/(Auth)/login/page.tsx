import LoginForm from "@/components/Auth/login-form";

const LoginPage = () => {
  return (
    <div className="mx-auto space-y-5 rounded-md border bg-white p-5 md:w-[70%] md:p-7 lg:w-[50%] lg:p-10">
      <h1 className="text-center text-3xl font-semibold">Login.</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
