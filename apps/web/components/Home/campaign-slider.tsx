"use client";
import { Button } from "@repo/ui";
import { BsArrowUpRight } from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CampaignSlider = () => {
  return (
    <div className="h-full w-full space-y-5">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-medium">Campaigns</h4>
        <Button variant={"outline"} className="flex gap-3 text-xs" size={"sm"}>
          Check All <BsArrowUpRight />
        </Button>
      </div>
      <Swiper modules={[Navigation]} navigation={true} className="h-full w-full" slidesPerView={1}>
        <SwiperSlide className="group relative">
          <div className="relative overflow-hidden rounded-md">
            <img
              className="duration-200 group-hover:scale-110"
              src="https://ninetheme.com/themes/fitment/wp-content/uploads/2024/01/vertical-banner-450-lux-2.jpg"
              alt="Campaign Banner"
            />
            <div className="absolute bottom-0 space-y-2 p-5 text-white">
              <h5 className="text-sm">Steering Rods</h5>
              <h4 className="text-lg font-semibold tracking-wide">Weekly Products</h4>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CampaignSlider;
