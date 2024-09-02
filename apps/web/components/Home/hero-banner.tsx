"use client";
import { Button } from "@repo/ui";
import Image from "next/image";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/slider.css";

const banners = [
  {
    heading: "Everyday Essentials, Exceptional Prices.",
    subHeading:
      "We have prepared the most special discounts for you on the most popular products you need. Don't miss these opportunities...",
    img: "https://klbtheme.com/bevesi/wp-content/uploads/2024/04/slider-01.jpg",
  },
  {
    heading: "The most ingenious pet products on the planet!",
    subHeading:
      "We have prepared the most special discounts for you on the most popular products you need. Don't miss these opportunities...",
    img: "https://klbtheme.com/bevesi/wp-content/uploads/2024/04/slider-02.jpg",
  },
  {
    heading: "Have your groceries delivered at any time.",
    subHeading:
      "We have prepared the most special discounts for you on the most popular products you need. Don't miss these opportunities...",
    img: "https://klbtheme.com/bevesi/wp-content/uploads/2024/04/slider-03.jpg",
  },
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
        {banners.map(({ img, heading, subHeading }, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                width={1000}
                height={550}
                className="h-full w-full rounded-md object-fill object-center"
                src={img}
                alt={`Banner ${index + 1}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-50" />
              <div className="absolute inset-0 flex flex-col justify-center gap-6 p-12 text-white">
                <h1 className="w-full text-3xl font-semibold lg:w-[60%] lg:text-4xl">{heading}</h1>
                <p className="text-sm lg:w-[80%] lg:text-base">{subHeading}</p>
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
