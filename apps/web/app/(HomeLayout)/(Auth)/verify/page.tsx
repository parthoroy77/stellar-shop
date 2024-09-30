"use client";
import { useVerification } from "@/hooks/use-verification";
import { Button } from "@ui/index";
import Link from "next/link";
import { AiOutlineLoading } from "react-icons/ai";
import { MdError, MdVerified } from "react-icons/md";

const VerifyPage = ({ searchParams }: { searchParams: { token: string } }) => {
  const token = searchParams.token;

  const verificationStatus = useVerification(token);

  const renderContent = () => {
    switch (verificationStatus) {
      case "loading":
        return <LoadingState />;
      case "verified":
        return <VerifiedState />;
      case "error":
        return <ErrorState />;
      default:
        return null;
    }
  };

  return <section>{renderContent()}</section>;
};

const LoadingState = () => (
  <div className="mx-auto flex h-[350px] flex-col items-center justify-center gap-3 p-5 lg:w-[50%]">
    <AiOutlineLoading className="text-primary size-10 animate-spin" />
    <span>Verifying Your Account</span>
  </div>
);

const VerifiedState = () => (
  <div className="mx-auto flex h-[350px] flex-col items-center justify-center gap-3 p-5 lg:w-[50%]">
    <MdVerified className="bg-muted-foreground size-[100px] rounded-full border p-4" />
    <h3 className="text-xl font-medium">Your Account Now Verified!!</h3>
    <span className="text-accent-foreground text-sm">Now you can fully access our platform</span>
    <Link href={"/login"}>
      <Button variant={"outline"} size={"sm"} className="px-6">
        Go To Login
      </Button>
    </Link>
  </div>
);

const ErrorState = () => (
  <div className="mx-auto flex h-[350px] flex-col items-center justify-center gap-3 p-5 lg:w-[50%]">
    <MdError className="size-[70px] rounded-full border bg-red-600 p-2 text-white lg:size-[100px] lg:p-4" />
    <h3 className="text-xl font-medium">Can't Verify Your Account</h3>
  </div>
);

export default VerifyPage;
