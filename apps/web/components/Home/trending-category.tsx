"use client";

import { Button } from "@repo/ui";
import { FaArrowRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
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
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wide">Trending Categories</h3>
        <Button className="w-[200px] flex items-center gap-3 rounded-3xl border-primary" variant={"outline"}>
          All Categories
          <FaArrowRight />
        </Button>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        // className="w-full h-full"
        spaceBetween={10}
        slidesPerView={9}
      >
        {sliderImg.map(({ image, id }) => (
          <SwiperSlide key={id} className="space-y-2 group cursor-pointer">
            <img
              className="border size-[130px] p-3 rounded-md group-hover:border-primary duration-300"
              src={image}
              alt="Slider Image"
            />
            <h4 className="text-center text-sm uppercase tracking-wide">Brake</h4>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingCategory;
