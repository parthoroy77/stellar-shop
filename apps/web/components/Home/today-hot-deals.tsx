"use client";
import { Button } from "@repo/ui";
import { BsArrowUpRight } from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TodayHotDeals = () => {
  return (
    <div className="flex gap-8">
      <Campaigns />
      <div className="w-[80%] space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-medium">Deals of The Day</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Hurry up to take advantage of offer</span>
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_x, index) => (
                <div
                  key={index}
                  className="border border-primary  size-10 rounded-md text-primary flex justify-center items-center"
                >
                  05
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div className="border border-primary rounded-md relative">
            <div className="flex justify-center">
              <img
                className="size-[175px]"
                src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product1-300x300.jpeg"
                alt="Product Image"
              />
            </div>
            <hr />
            <h3>DNA Motoring TOOLS-00266 Green</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const Campaigns = () => {
  return (
    <div className="w-[20%] space-y-5">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-medium">Campaigns</h4>
        <Button variant={"outline"} className="text-xs flex gap-3" size={"sm"}>
          Check All <BsArrowUpRight />
        </Button>
      </div>
      <Swiper modules={[Navigation]} navigation={true} className="w-full h-full" slidesPerView={1}>
        <SwiperSlide className="w-full h-full overflow-hidden group rounded-md relative">
          <div className="overflow-hidden rounded-md relative">
            <img
              className="group-hover:scale-110 duration-200 h-[400px]"
              src="https://ninetheme.com/themes/fitment/wp-content/uploads/2024/01/vertical-banner-450-lux-2.jpg"
              alt="Campaign Banner"
            />
            <div className="absolute bottom-0 text-white p-5 space-y-2">
              <h5 className="text-sm ">Steering Rods</h5>
              <h4 className="text-lg font-semibold tracking-wide">Weekly Products</h4>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TodayHotDeals;
