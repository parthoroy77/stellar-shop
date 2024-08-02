"use client";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import "../../styles/slider.css";
const sliderImages = [
  {
    id: 1,
    image:
      "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
  },
  {
    id: 2,
    image: "https://img.freepik.com/free-photo/sports-shoe-pair-design-illustration-generated-by-ai_188544-19642.jpg",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuyrCsfhzIIe00rnzImB5PupVfAyJmTwohUlPYaZNVqqk3UcDfI8oWtDKByjSzLwQznDU&usqp=CAU",
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZpMd2aojWdZnfdBKHhERdqJ_Xk_D4wJtV-jdZMjfXDSoWQhOTFhpd_MPnzXI1dyZ974&usqp=CAU",
  },
  {
    id: 5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZpMd2aojWdZnfdBKHhERdqJ_Xk_D4wJtV-jdZMjfXDSoWQhOTFhpd_MPnzXI1dyZ974&usqp=CAU",
  },
];

const ProductImageSlider = () => {
  const [activeThumb, setActiveThumb] = useState<SwiperType | null>(null);
  return (
    <div className="bg-muted-foreground/15 h-full space-y-5 rounded-md p-4">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div>
              <img
                src={image.image}
                className="h-[400px] w-full transform rounded-md object-fill transition-transform duration-500 ease-in-out hover:scale-110"
                alt={`Product image ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Thumbs, Autoplay]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className="border-primary flex size-[90px] items-center justify-center rounded-md border-2 border-none p-1">
              <img
                src={image.image}
                className="h-full w-full rounded-sm object-fill object-center"
                alt={`Thumbnail image ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSlider;
