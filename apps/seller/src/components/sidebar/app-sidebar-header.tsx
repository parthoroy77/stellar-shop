import { SidebarHeader } from "@ui/index";
import LogoText from "./logo-text";

const AppSidebarHeader = () => {
  return (
    <SidebarHeader className="hover:bg-accent/40 flex cursor-pointer flex-row items-center justify-between rounded-md duration-300">
      <LogoText />
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
