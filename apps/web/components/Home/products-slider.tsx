"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/slider.css";
import ProductCard from "../ui/product-card";
const ProductsSlider = () => {
  return (
    <Swiper
      className="mySwiper"
      modules={[Navigation, Autoplay]}
      navigation={true}
      loop={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      slidesPerView={2}
      pagination={{ clickable: true }}
      spaceBetween={5}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 3,
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

export default ProductsSlider;
