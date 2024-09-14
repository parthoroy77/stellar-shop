import { Button } from "@ui/index";
import { FC } from "react";
import { HiXMark } from "react-icons/hi2";
import SideFilters from "./side-filters";

interface MobileFilterMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileFilterMenu: FC<MobileFilterMenuProps> = ({ isOpen, setIsOpen }) => {
  const overlayClasses = "absolute inset-0 z-20 h-full w-full bg-black bg-opacity-50";

  const sidebarClasses = `absolute right-0  z-30 overflow-hidden border bg-white shadow-lg duration-200 ${
    isOpen ? "w-[90%]" : "w-0"
  }`;

  const closeButtonClasses = `invisible absolute left-0 top-0 z-40 w-[10%] rounded-none p-0 duration-500 ${
    isOpen && "visible"
  }`;

  return (
    <div className={`lg:hidden ${isOpen ? "fixed inset-0 z-10 h-screen w-full" : ""}`}>
      {/* Overlay that closes the sidebar when clicked */}
      {isOpen && <div className={overlayClasses} onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        <div className="custom-scrollbar h-full overflow-hidden overflow-y-scroll border p-3 pb-[55px]">
          <SideFilters mobileView={true} />
        </div>
      </div>
      {isOpen && (
        <Button onClick={() => setIsOpen(false)} className={closeButtonClasses}>
          <HiXMark size={20} />
        </Button>
      )}
    </div>
  );
};

export default MobileFilterMenu;
