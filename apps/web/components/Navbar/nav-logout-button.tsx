"use client";

import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";

export default function NavLogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex w-full items-center gap-3 rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100"
    >
      <CiLogout size={18} />
      <span>Logout</span>
    </button>
  );
}
