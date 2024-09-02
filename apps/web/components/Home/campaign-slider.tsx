"use client";
import { Button } from "@repo/ui";
import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/slider.css";

const CampaignSlider = () => {
  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Campaigns</h3>
        <Button variant={"outline"} className="flex gap-3 text-xs" size={"sm"}>
          Check All <BsArrowUpRight />
        </Button>
      </div>
      <Swiper
        className="mySwiper max-h-[400px] w-full"
        modules={[Navigation, Autoplay]}
        navigation={true}
        loop={true}
        spaceBetween={14}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={1}
      >
        <SwiperSlide className="group relative h-[400px]">
          <div className="relative h-full overflow-hidden rounded-md">
            <Image
              className="h-[400px] w-full duration-200 group-hover:scale-110"
              src="https://ninetheme.com/themes/fitment/wp-content/uploads/2024/01/vertical-banner-450-lux-2.jpg"
              alt="Campaign Banner"
            />
            <div className="absolute bottom-0 space-y-2 p-5 text-white">
              <h5 className="text-sm">Steering Rods</h5>
              <h4 className="text-lg font-semibold tracking-wide">Weekly Products</h4>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="group relative h-[400px]">
          <div className="relative h-full overflow-hidden rounded-md">
            <Image
              className="h-[400px] duration-200 group-hover:scale-110"
              src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/08/blog-post-6.png"
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
