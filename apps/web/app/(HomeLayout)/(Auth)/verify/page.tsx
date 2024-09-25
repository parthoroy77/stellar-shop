"use client";
import { useVerification } from "@/hooks/useVerification";
import { Button } from "@ui/index";
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
  <div className="mx-auto flex h-[350px] w-[50%] flex-col items-center justify-center gap-3 p-5">
    <AiOutlineLoading className="text-primary size-10 animate-spin" />
    <span>Verifying Your Account</span>
  </div>
);

const VerifiedState = () => (
  <div className="mx-auto flex h-[350px] w-[50%] flex-col items-center justify-center gap-3 p-5">
    <MdVerified className="bg-muted-foreground size-[100px] rounded-full border p-4" />
    <h3 className="text-xl font-medium">Your Account Now Verified!!</h3>
    <span className="text-accent-foreground text-sm">Now you can fully access our platform</span>
    <Button variant={"outline"} size={"sm"} className="px-6">
      Go To Login
    </Button>
  </div>
);

const ErrorState = () => (
  <div className="mx-auto flex h-[350px] w-[50%] flex-col items-center justify-center gap-3 p-5">
    <MdError className="size-[100px] rounded-full border bg-red-600 p-4 text-white" />
    <h3 className="text-xl font-medium">Can't Verify Your Account</h3>
  </div>
);

export default VerifyPage;
