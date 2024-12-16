"use client";
import { AppButton } from "@ui/index";
import { signOut } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";

const LogoutButton = () => {
  return (
    <AppButton
      type="button"
      size={"sm"}
      variant={"ghost"}
      onClick={() => signOut()}
      className="flex h-fit w-full items-center justify-start gap-2 !px-0 text-sm"
    >
      <LuLogOut />
      <span>Logout</span>
    </AppButton>
  );
};

export default LogoutButton;
