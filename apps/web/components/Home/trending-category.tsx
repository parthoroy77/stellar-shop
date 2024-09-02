"use client";

import { Button } from "@repo/ui";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const sliderImg = [
  { id: 1, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product2-300x300.jpg" },
  { id: 2, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/product3-300x300.jpg" },
  { id: 3, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/Nolathane-Sway-Bar-300x300.jpg" },
  { id: 4, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/04-061-300x300.jpg" },
  { id: 4, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/04-061-300x300.jpg" },
  { id: 4, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/04-061-300x300.jpg" },
  { id: 4, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/04-061-300x300.jpg" },
  { id: 4, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/04-061-300x300.jpg" },
  { id: 4, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/04-061-300x300.jpg" },
  { id: 4, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/04-061-300x300.jpg" },
  { id: 4, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/04-061-300x300.jpg" },
  { id: 4, image: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/04-061-300x300.jpg" },
];
const TrendingCategory = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-semibold tracking-wide lg:text-xl">Trending Categories</h5>
        <Button
          size={"sm"}
          className="border-primary flex items-center gap-3 rounded-3xl text-xs lg:w-[200px] lg:text-sm"
          variant={"outline"}
        >
          All Categories
          <FaArrowRight />
        </Button>
      </div>
      <Swiper
        className="mySwiper h-full w-full"
        modules={[Navigation, Autoplay]}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 2700,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 9,
          },
        }}
      >
        {sliderImg.map(({ image }, index) => (
          <SwiperSlide key={index} className="group relative cursor-pointer space-y-2">
            <Image
              width={100}
              height={100}
              className="group-hover:border-primary mx-auto size-[150px] rounded-md border p-3 duration-300 lg:size-[130px]"
              src={image}
              alt="Slider Image"
            />
            <h6 className="text-center text-sm uppercase tracking-wide">Brake</h6>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingCategory;
