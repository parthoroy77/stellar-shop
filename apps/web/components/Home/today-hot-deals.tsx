import { Separator } from "@repo/ui";
import CampaignSlider from "./campaign-slider";
import HotDealsSlider from "./hot-deals-slider";

const TodayHotDeals = () => {
  return (
    <div className="flex h-[500px] gap-8">
      <div className="w-[20%]">
        <CampaignSlider />
      </div>
      <div className="w-[80%] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <h3 className="text-xl font-medium">Deals of The Day</h3>
            <span>
              <Separator orientation="vertical" />
            </span>
            <span className="flex items-center text-xs text-gray-400">Sale up to 30% off on selected items.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Hurry up to take advantage of offer</span>
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_x, index) => (
                <div
                  key={index}
                  className="border-primary text-primary flex size-10 items-center justify-center rounded-md border"
                >
                  05
                </div>
              ))}
            </div>
          </div>
        </div>
        <HotDealsSlider />
      </div>
    </div>
  );
};

export default TodayHotDeals;
