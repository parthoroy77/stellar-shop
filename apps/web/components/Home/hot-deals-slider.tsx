"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../ui/product-card";

const HotDealsSlider = () => {
  return (
    <Swiper modules={[Navigation]} navigation={true} className="h-[410px] w-full" autoplay spaceBetween={14} slidesPerView={4}>
      {Array.from({ length: 5 }).map((_x) => (
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HotDealsSlider;
