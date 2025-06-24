"use client";
import { TBrand } from "@repo/utils/types";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../styles/slider.css";

const BrandSlider = ({ brands }: { brands: TBrand[] }) => {
  return (
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
      {brands.map(({ name, file }, index) => (
        <SwiperSlide key={index}>
          <Link href={`/search?brand=${name.toLowerCase()}`}>
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
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BrandSlider;
