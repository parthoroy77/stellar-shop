import { getServerAuth } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import VerifyView from "./components/verify-view";

type SearchParams = Promise<{ token: string | undefined }>;

const VerifyPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const token = (await searchParams).token;
  const { isAuthenticated } = await getServerAuth();

  // If already authenticated redirect to "/".
  if (isAuthenticated) {
    redirect("/");
  }

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <VerifyView token={token} />
    </section>
  );
};

export default VerifyPage;
