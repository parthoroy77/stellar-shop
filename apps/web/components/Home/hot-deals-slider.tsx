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
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 14,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 14,
        },
      }}
    >
      {Array.from({ length: 6 }).map((_x, index) => (
        <SwiperSlide key={index}>
          <ProductCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HotDealsSlider;
