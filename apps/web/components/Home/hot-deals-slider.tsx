"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/slider.css";
import ProductCard from "../ui/product-card";

const HotDealsSlider = () => {
  return (
    <Swiper
      className="mySwiper h-[410px] w-full"
      modules={[Navigation, Autoplay]}
      navigation={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,

      }}
      spaceBetween={14}
      slidesPerView={4}
    >
      {Array.from({ length: 6 }).map((_x) => (
        <SwiperSlide>
          <ProductCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HotDealsSlider;
