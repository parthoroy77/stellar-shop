import { GoDotFill } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMailOpenOutline } from "react-icons/io5";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const NotificationMenu = () => {
  return (
    <Popover>
      <PopoverTrigger className="hover:bg-accent/40 relative flex size-9 items-center justify-center rounded-full duration-300">
        <IoMdNotificationsOutline size={22} />
        <GoDotFill className="text-secondary absolute right-0 top-0" />
      </PopoverTrigger>
      <PopoverContent className="mt-1 w-[350px] divide-y p-0 *:px-4 *:py-3" align="end">
        <div className="flex justify-between">
          <span className="text-accent-foreground text-sm">Notifications</span>
          <div className="flex items-center justify-between gap-2">
            <Badge variant={"success"} className="rounded-md bg-opacity-70 font-normal">
              2 new
            </Badge>
            <IoMailOpenOutline size={20} />
          </div>
        </div>
        <div className="text-center text-sm">
          <span>No Notification found!</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationMenu;
