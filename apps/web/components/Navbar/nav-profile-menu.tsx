"use client";
import { useClientSession } from "@/lib/auth-utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@ui/index";
import Link from "next/link";
import { CiLogin, CiSettings } from "react-icons/ci";
import { PiUserCircleLight } from "react-icons/pi";
import NavLogoutButton from "./nav-logout-button";

const NavProfileMenu = () => {
  const { isAuthenticated } = useClientSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <PiUserCircleLight size={26} aria-label="User" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2 w-[200px] text-sm *:cursor-pointer">
        {isAuthenticated ? (
          <Link href={"/profile"}>
            <DropdownMenuItem className="flex gap-3 text-sm">
              <CiSettings size={20} />
              My Account
            </DropdownMenuItem>
            <NavLogoutButton />
          </Link>
        ) : (
          <Link href={"/login"}>
            <DropdownMenuItem className="flex gap-3 text-sm">
              <CiLogin size={20} />
              Login / Register
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavProfileMenu;
