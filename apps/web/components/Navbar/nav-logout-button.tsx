"use client";

import { logoutUser } from "@/actions/auth";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { toast } from "sonner";

export default function NavLogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Sending request to logout...", { duration: 3000 });
    const result = await logoutUser();
    if (result.success) {
      await signOut({ callbackUrl: "/" });
      toast.success(result.message, { id: toastId });
    } else {
      toast.error(result.message, { id: toastId });
    }
    setIsLoading(false);
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleLogout}
      className="flex items-center gap-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
    >
      <CiLogout size={20} />
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
