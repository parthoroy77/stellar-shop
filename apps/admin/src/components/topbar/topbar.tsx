import { Input } from "@ui/index";

const TopBar = () => {
  return (
    <div className="sticky top-0 h-[50px] w-full">
      <Input className="h-full w-full rounded-sm pl-14" placeholder="Search..." />
    </div>
  );
};

export default TopBar;
