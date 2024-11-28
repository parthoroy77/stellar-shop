import { SidebarTrigger } from "@ui/index";

const TopBar = () => {
  return (
    <div className="sticky top-0 z-30 flex h-[50px] w-full items-center justify-between gap-5 rounded-md border bg-white px-6">
      <SidebarTrigger />
    </div>
  );
};

export default TopBar;
