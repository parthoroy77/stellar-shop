import { Button } from "@repo/ui";
import Image from "next/image";

const banners = [
  {
    heading: "Because you deserve quality products",
    subHeading: "Come in and see the discounts, deals and more prepared for you!",
    img: "https://klbtheme.com/bevesi/wp-content/uploads/2024/04/banner-01.jpg",
    tagLine: "We sell what you need",
  },
  {
    heading: "A place to throw your worries away",
    subHeading: "Come in and see the discounts, deals and more prepared for you!",
    img: "https://klbtheme.com/bevesi/wp-content/uploads/2024/04/banner-02.jpg",
    tagLine: "Find everything you need",
  },
  {
    heading: "Customer satisfaction is our fashion",
    subHeading: "Come in and see the discounts, deals and more prepared for you!",
    img: "https://klbtheme.com/bevesi/wp-content/uploads/2024/04/banner-03.jpg",
    tagLine: "We sell what you need",
  },
  {
    heading: "Providing the best for our customers",
    subHeading: "Come in and see the discounts, deals and more prepared for you!",
    img: "https://klbtheme.com/bevesi/wp-content/uploads/2024/04/banner-04.jpg",
    tagLine: "Don't worry, we have it!",
  },
];
const FeaturedBanners = () => {
  return (
    <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-4">
      {banners.map((b, i) => (
        <div key={i} className="relative h-[500px] w-full overflow-hidden rounded-md">
          <Image height={500} width={300} src={b.img} alt="" className="absolute h-full w-full" />
          <div className="absolute h-full w-full space-y-4 p-8 font-medium">
            <span className="block text-xs">{b.tagLine}</span>
            <h1 className="text-2xl">{b.heading}</h1>
            <p className="text-sm font-normal text-gray-700">{b.subHeading}</p>
            <Button className="border-primary rounded-none border-b-2 bg-transparent p-0 text-black" size={"sm"}>
              Show Now
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedBanners;
