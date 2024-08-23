import { Input } from "@repo/ui";
import { CgSearch } from "react-icons/cg";

const NavSearchBar = () => {
  return (
    <div className="flex h-[45px] items-center">
      <Input
        placeholder="Search everything at your stellar shop..."
        className="bg-accent/40 focus:border-primary peer right-0 h-full rounded-r-none border-r-0 px-5 text-xs text-black outline-none placeholder:text-xs placeholder:text-gray-400 lg:h-[97%] lg:min-w-[550px]"
      />
      <span className="text-primary border-primary bg-primary flex h-full items-center rounded-md rounded-l-none border px-4 text-2xl text-white lg:px-3">
        <CgSearch />
      </span>
    </div>
  );
};

export default NavSearchBar;
