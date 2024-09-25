"use client";
import AppButton from "@/components/ui/app-button";
import { fetcher } from "@/lib/fetcher";
import { useTransition } from "react";
import { toast } from "sonner";

const SendNewEmail = ({ email }: { email: string }) => {
  const [isPending, startTransition] = useTransition();
  const handleRequestNewEmail = async () => {
    startTransition(async () => {
      const response = await fetcher("/auth/resend-verification", { method: "POST", body: { email } });
      if (response.success) {
        toast.success(response.message);
      } else if (response.error) {
        toast.error(response.message);
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
