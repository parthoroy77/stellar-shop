import { GoSearch } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";

interface TopBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopBar({ open, setOpen }: TopBarProps) {
  return (
    <div className="sticky top-0 flex h-[50px] w-full items-center gap-5 rounded-md border px-6">
      <button type="button" onClick={() => setOpen(!open)} className="lg:hidden" aria-label="Toggle sidebar">
        <RxHamburgerMenu size={20} />
      </button>
      <GoSearch size={20} />
    </div>
  );
}
