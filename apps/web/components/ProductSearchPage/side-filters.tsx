import { Checkbox, Label } from "@repo/ui";
import { HiOutlinePlus } from "react-icons/hi2";

const SideFilters = () => {
  return (
    <div className="divide-y rounded-md border *:px-8 *:py-5">
      <div>sdf</div>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="font-medium">Categories</span>
          <HiOutlinePlus />
        </div>
        <span className="flex items-center gap-3">
          <Checkbox />
          <Label>Apex</Label>
        </span>
        <span className="flex items-center gap-3">
          <Checkbox />
          <Label>Bata</Label>
        </span>
      </div>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="font-medium">Brands</span>
          <HiOutlinePlus />
        </div>
        <span className="flex items-center gap-3">
          <Checkbox />
          <Label>Apex</Label>
        </span>
        <span className="flex items-center gap-3">
          <Checkbox />
          <Label>Bata</Label>
        </span>
      </div>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="font-medium">Products Status</span>
          <HiOutlinePlus />
        </div>
        <span className="flex items-center gap-3">
          <Checkbox />
          <Label>In Stock</Label>
        </span>
        <span className="flex items-center gap-3">
          <Checkbox />
          <Label>On Sale</Label>
        </span>
      </div>
    </div>
  );
};

export default SideFilters;
