"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/slider.css";
const sliderImg = [
  { id: 1, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2024/01/vertical-banner-3.png" },
  { id: 2, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2024/01/vertical-banner-2.png" },
];
const HeroSlider = () => {
  return (
    <div className="h-full w-full lg:w-[24%]">
      <Swiper
        className="mySwiper h-full w-full"
        modules={[Navigation, Autoplay]}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {sliderImg.map(({ image, id }) => (
          <SwiperSlide key={id} className="h-full w-full">
            <Image width={300} height={550} className="h-full w-full rounded-md" src={image} alt="Slider Image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
