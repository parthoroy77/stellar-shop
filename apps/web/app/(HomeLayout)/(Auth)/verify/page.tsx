"use client";
import { fetcher } from "@/lib/fetcher";
import { Button } from "@ui/index";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { MdError, MdVerified } from "react-icons/md";
import { toast } from "sonner";

const VerifyPage = ({ searchParams }: { searchParams: { token: string } }) => {
  const token = searchParams.token;
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "verified" | "error" | null>(null);

  const verifyUser = async () => {
    if (!token) {
      setVerificationStatus("error");
      return;
    }

    setVerificationStatus("loading");

    try {
      const response = await fetcher("/auth/verify-account", {
        method: "POST",
        body: JSON.stringify({ token }),
        cache: "no-store",
      });

      if (response.success) {
        toast.success("Account Verified Successfully");
        setVerificationStatus("verified");
      } else {
        toast.error(response.message);
        setVerificationStatus("error");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setVerificationStatus("error");
    }
  };

  useEffect(() => {
    verifyUser();
  }, [token]);

  const renderContent = () => {
    switch (verificationStatus) {
      case "loading":
        return (
          <div className="mx-auto flex h-[350px] w-[50%] flex-col items-center justify-center gap-3 p-5">
            <AiOutlineLoading className="text-primary size-10 animate-spin" />
            <span>Verifying Your Account</span>
          </div>
        );
      case "verified":
        return (
          <div className="mx-auto flex h-[350px] w-[50%] flex-col items-center justify-center gap-3 p-5">
            <MdVerified className="bg-muted-foreground size-[100px] rounded-full border p-4" />
            <h3 className="text-xl font-medium">Your Account Now Verified!!</h3>
            <span className="text-accent-foreground text-sm">Now you can fully access our platform</span>
            <Button variant={"outline"} size={"sm"} className="px-6">
              Go To Login
            </Button>
          </div>
        );
      case "error":
        return (
          <div className="mx-auto flex h-[350px] w-[50%] flex-col items-center justify-center gap-3 p-5">
            <MdError className="size-[100px] rounded-full border bg-red-600 p-4 text-white" />
            <h3 className="text-xl font-medium">Can't Verify Your Account</h3>
          </div>
        );
      default:
        return null;
    }
  };

  return <section>{renderContent()}</section>;
};

export default VerifyPage;
