"use client";
import { TCategory } from "@repo/utils/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
interface Props {
  categories: TCategory[];
}

const TrendingCategoriesSlider: FC<Props> = ({ categories = [] }) => {
  return (
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
      slidesPerView={3}
      breakpoints={{
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 9,
        },
      }}
    >
      {categories.map(({ categoryName, urlSlug, id, images }) => (
        <SwiperSlide key={id} className="group relative cursor-pointer space-y-2">
          <Link href={`/categories/${urlSlug}`} className="block space-y-2">
            <Image
              width={100}
              height={100}
              className="group-hover:border-primary mx-auto size-24 rounded-md border object-fill p-3 duration-300 lg:size-32"
              src={images[0]?.file.fileSecureUrl || "/placeholder.png"}
              alt="Slider Image"
            />
            <h6 className="mx-auto line-clamp-2 max-w-28 text-center text-sm tracking-wide">{categoryName}</h6>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrendingCategoriesSlider;
