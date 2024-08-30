import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import React from "react";
import { HiXMark } from "react-icons/hi2";
import MobileCategoryMenu from "./mobile-category-menu";
import MobileNavMenu from "./mobile-nav-menu";

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, setIsOpen }) => {
  const overlayClasses = "absolute inset-0 z-20 h-full w-full bg-black bg-opacity-50";
  const sidebarClasses = `absolute inset-0 z-30 overflow-hidden border bg-white shadow-lg duration-200 ${
    isOpen ? "w-[85%]" : "w-0"
  }`;
  const closeButtonClasses = `invisible absolute left-0 top-0 z-40 w-fit rounded-none text-xl duration-500 ${
    isOpen && "visible left-[85%]"
  }`;

  return (
    <div className={`lg:hidden ${isOpen ? "fixed inset-0 z-10 h-screen w-full" : ""}`}>
      {/* Overlay that closes the sidebar when clicked */}
      {isOpen && <div className={overlayClasses} onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        <Tabs
          defaultValue="category"
          className="custom-scrollbar h-full w-full overflow-hidden overflow-y-scroll pb-[55px]"
        >
          <TabsList className="text-primary-foreground flex h-fit rounded-none border-b bg-white p-0 font-normal *:w-full *:py-2 *:ring-0">
            <TabsTrigger value="category">Categories</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
          </TabsList>
          <TabsContent className="mt-0" value="category">
            <MobileCategoryMenu />
          </TabsContent>
          <TabsContent className="mt-0" value="menu">
            <MobileNavMenu />
          </TabsContent>
        </Tabs>
      </div>

      {/* Close button */}
      {isOpen && (
        <Button onClick={() => setIsOpen(false)} className={closeButtonClasses}>
          <HiXMark />
        </Button>
      )}
    </div>
  );
};

export default MobileSidebar;
