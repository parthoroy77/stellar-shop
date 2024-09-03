import { Checkbox, Label } from "@repo/ui";
import { HiOutlinePlus } from "react-icons/hi2";

const SideFilters = () => {
  return (
    <aside className="h-fit w-[20%] divide-y rounded-md border *:px-6 *:py-5">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Categories</span>
          <HiOutlinePlus />
        </div>
        <div className="space-y-2">
          <span className="flex items-center gap-3">
            <Checkbox />
            <Label className="text-sm">Apex</Label>
          </span>
          <span className="flex items-center gap-3">
            <Checkbox />
            <Label className="text-sm">Bata</Label>
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Brands</span>
          <HiOutlinePlus />
        </div>
        <div className="space-y-2">
          <span className="flex items-center gap-3">
            <Checkbox />
            <Label className="text-sm">Apex</Label>
          </span>
          <span className="flex items-center gap-3">
            <Checkbox />
            <Label className="text-sm">Bata</Label>
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Products Status</span>
          <HiOutlinePlus />
        </div>
        <div className="space-y-2">
          <span className="flex items-center gap-3">
            <Checkbox />
            <Label className="text-sm">In Stock</Label>
          </span>
          <span className="flex items-center gap-3">
            <Checkbox />
            <Label className="text-sm">On Sale</Label>
          </span>
        </div>
      </div>
    </aside>
  );
};

export default SideFilters;
