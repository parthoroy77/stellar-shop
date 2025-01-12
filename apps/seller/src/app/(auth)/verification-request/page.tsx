import { getServerAuth } from "@/lib/auth-utils";
import { Button, Separator } from "@ui/index";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CiInboxOut } from "react-icons/ci";
import SendNewEmail from "./components/send-new-email";

const VerificationPage = async ({ searchParams }: { searchParams: { email: string } }) => {
  const email = searchParams.email;

  if (!email) {
    redirect("/register");
  }

  const { isAuthenticated } = await getServerAuth();
  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <section className="relative flex w-full items-center justify-center">
      <div className="text-accent-foreground flex h-fit flex-col items-center justify-center gap-5 rounded-md border p-5 text-center">
        <CiInboxOut className="bg-muted-foreground size-[100px] rounded-full border p-4" />
        <h5 className="font-medium">Check Your Email</h5>
        <p className="text-sm lg:w-[60%]">
          We'v sent you an email to <span className="font-medium">{email}</span>. Please click the link in the email to
          activate your account.
        </p>
        <Separator className="mx-auto lg:w-[70%]" />
        <h6 className="text-xs">You didn't receive an email or your link expired</h6>
        <SendNewEmail email={email} />
      </div>

      <Link className="absolute left-10 top-10" href={"/"}>
        <Button variant={"link"}>Back to Home</Button>
      </Link>
    </section>
  );
};

export default VerificationPage;
