"use client";
import { resendVerificationEmail } from "@/actions/auth";
import { AppButton } from "@ui/index";
import { useTransition } from "react";
import { toast } from "sonner";

const SendNewEmail = ({ email }: { email: string }) => {
  const [isPending, startTransition] = useTransition();
  const handleRequestNewEmail = async () => {
    startTransition(async () => {
      const result = await resendVerificationEmail(email);
      if (result.success) {
        toast.success(result.message);
      } else if (result.error) {
        toast.error(result.message);
      }
    });
  };
  return (
    <div>
      <AppButton
        onClick={handleRequestNewEmail}
        loading={isPending}
        disabled={isPending}
        variant={"outline"}
        size={"sm"}
        className="px-6"
      >
        Request a new verification email
      </AppButton>
    </div>
  );
};

export default SendNewEmail;
