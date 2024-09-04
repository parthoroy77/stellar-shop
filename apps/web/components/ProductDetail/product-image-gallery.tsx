"use client";
import Image from "next/image";
import { CSSProperties, MouseEvent, useState } from "react";
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

type ZoomStyles = {
  display: string;
  zoomX: string;
  zoomY: string;
};

const ProductImageGallery = () => {
  const [activeThumb, setActiveThumb] = useState<SwiperType | null>(null);
  const [zoomStyles, setZoomStyles] = useState<ZoomStyles>({
    display: "none",
    zoomX: "0%",
    zoomY: "0%",
  });
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>, image: string) => {
    const target = event.target as HTMLDivElement;
    const { offsetX, offsetY } = event.nativeEvent;
    const { offsetWidth, offsetHeight } = target;

    const pointer = {
      x: (offsetX * 100) / offsetWidth,
      y: (offsetY * 100) / offsetHeight,
    };

    setZoomStyles({
      display: "block",
      zoomX: `${pointer.x}%`,
      zoomY: `${pointer.y}%`,
    });
  };

  const handleMouseOut = () => {
    setZoomStyles({ ...zoomStyles, display: "none" });
  };

  return (
    <div className="bg-muted-foreground/15 h-fit space-y-5 rounded-md lg:border lg:p-4">
      <Swiper
        loop
        spaceBetween={10}
        navigation
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: activeThumb }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div
              className="relative w-full cursor-zoom-in overflow-hidden rounded-sm"
              style={
                {
                  "--display": zoomStyles.display,
                  "--zoom-x": zoomStyles.zoomX,
                  "--zoom-y": zoomStyles.zoomY,
                  "--url": `url(${image.image})`,
                } as CSSProperties
              }
              onMouseMove={(event) => handleMouseMove(event, image.image)}
              onMouseOut={handleMouseOut}
            >
              <Image
                height={400}
                width={400}
                src={image.image}
                className="aspect-auto h-[400px] w-full rounded-sm object-cover object-top"
                alt={`Product image ${index + 1}`}
              />
              <div
                className="absolute inset-0"
                style={
                  {
                    display: zoomStyles.display,
                    backgroundColor: "black",
                    backgroundImage: `url(${image.image})`,
                    backgroundSize: "250%",
                    backgroundPosition: `${zoomStyles.zoomX} ${zoomStyles.zoomY}`,
                  } as CSSProperties
                }
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        modules={[Thumbs, Autoplay]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={3}
        spaceBetween={5}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
        }}
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className="border-primary flex size-[90px] cursor-pointer items-center justify-center rounded-md border-2 border-none p-1">
              <Image
                width={90}
                height={90}
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

export default ProductImageGallery;
