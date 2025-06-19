"use client";
import { getAllBrands } from "@/actions/brand";
import { useQueryData } from "@repo/tanstack-query";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img from "../../public/ui-images/wheel.png";
import "../../styles/slider.css";

const PopularBrands = () => {
  const { data } = useQueryData(["brands"], () => getAllBrands(), {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
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
        {data && data?.length > 8
          ? data?.map(({ name, file }, index) => (
              <SwiperSlide key={index}>
                <div className="flex w-fit cursor-pointer flex-col items-center justify-center gap-2">
                  <Image
                    width={180}
                    height={100}
                    className="h-[80px] w-[180px] rounded-md border object-contain p-3"
                    src={file.fileSecureUrl}
                    alt={name + " " + "Brand Image"}
                  />
                  <h6 className="font-medium">{name}</h6>
                </div>
              </SwiperSlide>
            ))
          : Array.from({ length: 10 }).map((_x, i) => (
              <SwiperSlide key={i}>
                <div className="flex w-fit cursor-pointer flex-col items-center justify-center gap-2">
                  <Image
                    className="h-[80px] w-[180px] rounded-md border object-contain p-3"
                    alt={"Brand Image"}
                    src={img}
                  />
                  <h6 className="font-medium">Bashundhara</h6>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default PopularBrands;
