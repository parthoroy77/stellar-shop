"use client";
import { Button } from "@repo/ui";
import { BsArrowUpRight } from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CampaignSlider = () => {
  return (
    <div className="w-full space-y-5">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-medium">Campaigns</h4>
        <Button variant={"outline"} className="text-xs flex gap-3" size={"sm"}>
          Check All <BsArrowUpRight />
        </Button>
      </div>
      <Swiper modules={[Navigation]} navigation={true} className="w-full h-full" slidesPerView={1}>
        <SwiperSlide className="group relative">
          <div className="overflow-hidden rounded-md relative">
            <img
              className="group-hover:scale-110 duration-200"
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

export default CampaignSlider;
