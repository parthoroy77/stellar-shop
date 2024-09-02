"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/slider.css";
const brands = [
  { img: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/3.png" },
  { img: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/3.png" },
  { img: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/3.png" },
  { img: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/3.png" },
  { img: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/3.png" },
  { img: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/3.png" },
  { img: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/3.png" },
  { img: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/3.png" },
  { img: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/3.png" },
  { img: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/3.png" },
  { img: "https://ninetheme.com/themes/fitment/wp-content/uploads/2023/10/6.png" },
];
const PopularBrands = () => {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-medium">Search By Brands</h3>
      <Swiper
        className="mySwiper w-full"
        modules={[Navigation, Autoplay]}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          560: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 8,
          },
        }}
      >
        {brands.map(({ img }, index) => (
          <SwiperSlide key={index}>
            <div className="flex w-fit cursor-pointer flex-col items-center justify-center gap-2">
              <Image
                width={180}
                height={100}
                className="h-[80px] w-[180px] rounded-md border object-contain p-3"
                src={img}
                alt="Brand Image"
              />
              <h6 className="text-sm">Basundhara</h6>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularBrands;
