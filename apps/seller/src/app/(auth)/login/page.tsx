import AuthSidebar from "../components/auth-sidebar";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full items-center">
      <AuthSidebar />
      <section className="h-full w-[40%]"></section>
    </div>
  );
};

export default LoginPage;
