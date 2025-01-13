"use client";
import { AppButton } from "@ui/index";
import { signOut } from "next-auth/react";
import { useTransition } from "react";
import { LuLogOut } from "react-icons/lu";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <AppButton
      type="button"
      size={"sm"}
      variant={"ghost"}
      loading={isPending}
      onClick={() => startTransition(() => signOut())}
      className="flex h-fit w-full items-center justify-start gap-2 !px-0 text-sm"
    >
      {!isPending && <LuLogOut />}
      <span>Logout</span>
    </AppButton>
  );
};

export default LogoutButton;
