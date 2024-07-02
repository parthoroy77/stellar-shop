import { Button } from "@repo/ui";
import { FC } from "react";
import { HiXMark } from "react-icons/hi2";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const MobileSidebar: FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`${isOpen ? "fixed inset-0 z-10 h-screen w-full" : ""} lg:hidden`}>
      {/* Overlay that closes the sidebar when clicked */}
      {isOpen && (
        <div
          className="absolute inset-0 z-20 h-full w-full bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`absolute inset-0 z-30 divide-y overflow-hidden border bg-white shadow-lg duration-200 ${isOpen ? "w-[80%]" : "w-0"}`}
      >
        <div className="flex items-center divide-x text-center *:w-full">
          <div className="px-5 py-3 font-medium uppercase">
            <span>Category</span>
          </div>
          <div className="px-5 py-3 font-medium uppercase">
            <span>Menu</span>
          </div>
        </div>
        <div></div>
      </div>
      {/* Close button */}
      {isOpen && (
        <Button
          onClick={() => setIsOpen(false)}
          className="absolute left-[80%] top-0 z-40 w-fit rounded-none text-xl duration-500"
        >
          <HiXMark />
        </Button>
      )}
    </div>
  );
};

export default MobileSidebar;
