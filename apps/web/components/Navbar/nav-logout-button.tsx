"use client";
import { AppButton } from "@ui/index";
import { signOut } from "next-auth/react";
import { useTransition } from "react";
import { CiLogout } from "react-icons/ci";

export default function NavLogoutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <AppButton
      loading={isPending}
      variant={"ghost"}
      onClick={() => startTransition(() => signOut())}
      className="flex h-fit w-full justify-start gap-3 rounded-md px-2 py-1.5 text-sm font-normal text-gray-700 hover:bg-gray-100"
    >
      {!isPending && <CiLogout size={18} />}
      <span>Logout</span>
    </AppButton>
  );
}
