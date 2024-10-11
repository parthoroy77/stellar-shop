import { Input } from "@ui/index";

const TopBar = () => {
  return (
    <div className="h-[50px] w-full sticky top-0">
      <Input className="h-full w-full rounded-sm pl-14" placeholder="Search..." />
    </div>
  );
};

export default TopBar;
