import { GoDotFill } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";

const NotificationMenu = () => {
  return (
    <button
      type="button"
      className="hover:bg-accent/40 relative flex size-9 items-center justify-center rounded-full border duration-300"
    >
      <IoMdNotificationsOutline size={22} />
      <GoDotFill className="text-secondary absolute right-0 top-0" />
    </button>
  );
};

export default NotificationMenu;
