import { Input, Slider } from "@ui/index";

const PriceRange = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-medium capitalize">Filter By Price</span>
        <button type="button" className="text-primary text-sm">
          Clear
        </button>
      </div>
      <div className="space-y-4">
        <Slider />
        <div className="flex justify-between gap-5">
          <Input placeholder="Min" className="h-[30px] text-xs" />
          <Input placeholder="Max" className="h-[30px] text-xs" />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
