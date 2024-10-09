import { getServerAuth } from "@/lib/auth-utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@ui/index";
import { CiLogin, CiLogout, CiSettings } from "react-icons/ci";
import { PiUserCircleLight } from "react-icons/pi";

const NavProfileMenu = async () => {
  const { isAuthenticated } = await getServerAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <PiUserCircleLight size={26} aria-label="User" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2 w-[200px] text-sm *:cursor-pointer">
        {isAuthenticated ? (
          <>
            <DropdownMenuItem className="flex gap-3 text-sm">
              <CiSettings size={20} />
              My Account
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-3 text-sm">
              <CiLogout size={20} />
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className="flex gap-3 text-sm">
            <CiLogin size={20} />
            Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavProfileMenu;
