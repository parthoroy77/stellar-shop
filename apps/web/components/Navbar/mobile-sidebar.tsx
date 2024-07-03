import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { FC } from "react";
import { HiXMark } from "react-icons/hi2";
import MobileAllCategoryMenu from "./mobile-allcategory-menu";

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
        className={`absolute inset-0 z-30 overflow-hidden border bg-white shadow-lg duration-200 ${isOpen ? "w-[85%]" : "w-0"}`}
      >
        <Tabs defaultValue="category" className="w-full">
          <TabsList className="flex h-fit rounded-none bg-white p-0 *:m-0 *:w-full *:rounded-none *:border-b *:border-r *:bg-white *:text-black *:ring-0">
            <TabsTrigger value="category">Account</TabsTrigger>
            <TabsTrigger value="menu">Password</TabsTrigger>
          </TabsList>
          <TabsContent className="mt-0" value="category">
            <MobileAllCategoryMenu />
          </TabsContent>
          <TabsContent className="mt-0" value="menu">
            Change your password here.
          </TabsContent>
        </Tabs>
        <div></div>
      </div>
      {/* Close button */}
      {isOpen && (
        <Button
          onClick={() => setIsOpen(false)}
          className={`invisible absolute left-0 top-0 z-40 w-fit rounded-none text-xl duration-500 ${isOpen && "visible left-[85%]"}`}
        >
          <HiXMark />
        </Button>
      )}
    </div>
  );
};

export default MobileSidebar;
