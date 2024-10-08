import LoginForm from "@/components/Auth/login-form";
import { getServerAuth } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { isAuthenticated } = await getServerAuth();
  if (isAuthenticated) {
    redirect("/");
  }
  return (
    <div className="mx-auto space-y-5 rounded-md border bg-white p-5 md:w-[70%] md:p-7 lg:w-[50%] lg:p-10">
      <h1 className="text-center text-3xl font-semibold">Login.</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
