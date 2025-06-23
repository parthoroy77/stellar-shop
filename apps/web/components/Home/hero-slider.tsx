"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../public/ui-images/hero-slider-1.png";
import img2 from "../../public/ui-images/hero-slider-2.png";
import "../../styles/slider.css";

const sliderImg = [
  { id: 1, image: img1 },
  { id: 2, image: img2 },
];
const HeroSlider = () => {
  return (
    <div className="h-full w-full lg:w-72">
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
