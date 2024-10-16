import { RxHamburgerMenu } from "react-icons/rx";
import CommandMenu from "../ui/command-menu";
import NotificationMenu from "../ui/notification-menu";
import ProfileMenu from "../ui/profile-menu";

interface TopBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopBar({ open, setOpen }: TopBarProps) {
  return (
    <div className="sticky top-0 flex h-[50px] w-full items-center justify-between gap-5 rounded-md border px-6">
      <div className="flex items-center gap-5">
        <button type="button" onClick={() => setOpen(!open)} className="lg:hidden" aria-label="Toggle sidebar">
          <RxHamburgerMenu size={20} />
        </button>
        <CommandMenu />
      </div>
      <div className="flex items-center gap-3">
        <NotificationMenu />
        <ProfileMenu />
      </div>
    </div>
  );
}
