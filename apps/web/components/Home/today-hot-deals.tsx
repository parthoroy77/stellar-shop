import { Separator } from "@repo/ui";
import ProductsSlider from "./products-slider";
import SideBanner from "./side-banner";

const TodayHotDeals = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-[20%]">
        <SideBanner
          heading="Grab Up Exciting Deals"
          subHeading="Free Shipping Over $50"
          className="bg-[url('https://ninetheme.com/themes/fitment/wp-content/uploads/2024/01/vertical-banner-2.png')] text-white"
        />
      </div>
      <div className="w-full space-y-4 overflow-hidden lg:w-[80%]">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col lg:flex-row lg:gap-2">
            <h3 className="text-xl font-medium">Deals of The Day</h3>
            <span className="hidden lg:block">
              <Separator orientation="vertical" />
            </span>
            <span className="flex items-center text-xs text-gray-400">Sale up to 30% off on selected items.</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium lg:text-sm">Hurry up to take advantage of offer</span>
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_x, index) => (
                <div
                  key={index}
                  className="border-primary text-primary flex size-6 items-center justify-center rounded-sm border text-xs lg:size-10 lg:rounded-md"
                >
                  05
                </div>
              ))}
            </div>
          </div>
        </div>
        <ProductsSlider />
      </div>
    </div>
  );
};

export default TodayHotDeals;
