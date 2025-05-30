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
    <div className="sticky top-0 z-30 flex h-12 w-full items-center justify-between gap-5 rounded-md border bg-white px-6 drop-shadow">
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
