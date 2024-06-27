"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const sliderImg = [
  { id: 1, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2024/01/vertical-banner-3.png" },
  { id: 2, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2024/01/vertical-banner-2.png" },
];
const HeroSlider = () => {
  return (
    <div className="h-full w-[24%]">
      <Swiper modules={[Navigation]} navigation={true} className="h-full w-full" slidesPerView={1}>
        {sliderImg.map(({ image, id }) => (
          <SwiperSlide key={id} className="h-full w-full">
            <img className="h-full w-full rounded-md" src={image} alt="Slider Image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
