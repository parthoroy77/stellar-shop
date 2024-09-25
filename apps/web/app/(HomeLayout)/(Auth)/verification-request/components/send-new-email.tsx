"use client";
import { fetcher } from "@/lib/fetcher";
import { Button } from "@ui/index";
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
      <Button onClick={handleRequestNewEmail} disabled={isPending} variant={"outline"} size={"sm"} className="px-6">
        Request a new verification email
      </Button>
    </div>
  );
};

export default SendNewEmail;
