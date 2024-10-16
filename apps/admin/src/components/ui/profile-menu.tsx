import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/index";
import { CiSettings, CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "Profile", href: "/", Icon: CiUser },
  { label: "Setting", href: "/", Icon: CiSettings },
];

const ProfileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://media.istockphoto.com/id/1014065698/photo/im-serious-about-success.jpg?s=612x612&w=0&k=20&c=ValIWlBiRlgncEje7UcSh-1sBxDSKuf41sKRn0e2GNg=" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map(({ label, href, Icon }, i) => (
          <Link to={href}>
            <DropdownMenuItem key={i} className="flex items-center gap-2 font-medium">
              <Icon size={22} />
              <span>{label}</span>
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <Button size={"sm"} className="flex h-7 w-full items-center justify-center gap-2">
          <span>Logout</span>
          <IoIosLogOut />
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
