"use client";
import { Button } from "@repo/ui";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/slider.css";

const banners = [
  { img: "https://klbtheme.com/bevesi/wp-content/uploads/2024/04/slider-01.jpg" },
  { img: "https://klbtheme.com/bevesi/wp-content/uploads/2024/04/slider-02.jpg" },
  { img: "https://klbtheme.com/bevesi/wp-content/uploads/2024/04/slider-03.jpg" },
  { img: "https://klbtheme.com/bevesi/wp-content/uploads/2024/04/slider-01.jpg" },
];

const HeroBanner = () => {
  return (
    <div className="h-[550px] w-full overflow-hidden rounded-md lg:w-[58%]">
      <Swiper
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        modules={[Navigation, Autoplay]}
        className="h-full w-full"
      >
        {banners.map(({ img }, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                className="h-full w-full rounded-md object-fill object-center"
                src={img}
                alt={`Banner ${index + 1}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-50" />
              <div className="absolute inset-0 flex flex-col justify-center gap-6 p-8 text-white">
                <h1 className="text-3xl font-semibold lg:text-4xl">Trends Car Rims</h1>
                <p className="text-sm lg:w-[80%] lg:text-lg">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, tempora voluptates dicta incidunt
                  commodi magni maxime nobis debitis nesciunt obcaecati dolorem a.
                </p>
                <div className="space-x-3">
                  <Button className="px-8 text-sm text-white" size="sm">
                    Shop Now!!
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(HeroBanner);
