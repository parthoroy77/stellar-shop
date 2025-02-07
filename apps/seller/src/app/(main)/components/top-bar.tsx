import AppBreadcrumbs from "@/components/ui/app-breadcrumbs";
import { Separator, SidebarTrigger } from "@repo/ui";
import NotificationMenu from "@ui/components/notification-menu";

const TopBar = () => {
  return (
    <div className="sticky top-0 z-30 flex h-12 items-center justify-between rounded-md border-b bg-white px-5 py-3 drop-shadow">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-fit w-fit" variant={"ghost"} />
        <Separator orientation="vertical" className="bg-secondary h-4" />
        <AppBreadcrumbs />
      </div>
      <NotificationMenu />
    </div>
  );
};

export default TopBar;
