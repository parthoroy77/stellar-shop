import { Input } from "@repo/ui";
import { CgSearch } from "react-icons/cg";

const NavSearchBar = () => {
  return (
    <div className="flex h-[45px] items-center">
      <Input
        placeholder="Search For Products"
        className="bg-accent/40 focus:border-primary right-0 h-[97%] min-w-[500px] rounded-r-none px-5 outline-none"
      />
      <span className="bg-primary flex h-full items-center rounded-sm rounded-l-none border px-5 text-xl text-white">
        <CgSearch />
      </span>
    </div>
  );
};

export default NavSearchBar;
