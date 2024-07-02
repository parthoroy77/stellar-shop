import { Input } from "@repo/ui";
import { CgSearch } from "react-icons/cg";

const NavSearchBar = () => {
  return (
    <div className="flex h-[45px] items-center">
      <Input
        placeholder="Search For Products"
        className="bg-accent/40 focus:border-primary peer right-0 h-full rounded-r-none border-r-0 px-5 text-xs text-black outline-none placeholder:text-gray-600 md:text-base lg:h-[97%] lg:min-w-[550px]"
      />
      <span className="bg-accent/40 text-primary peer-focus:border-primary flex h-full items-center rounded-sm rounded-l-none border px-4 text-xl peer-focus:border lg:px-5">
        <CgSearch />
      </span>
    </div>
  );
};

export default NavSearchBar;
