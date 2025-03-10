import { Badge, Progress } from "@repo/ui";
import Image from "next/image";
import { IoEyeOutline } from "react-icons/io5";
import { PiShoppingCartSimple } from "react-icons/pi";
import { SlHeart } from "react-icons/sl";

const HeroFeatureProducts = () => {
  return (
    <div className="border-primary flex h-full w-full flex-col items-center justify-between gap-3 rounded-lg border p-6 lg:w-[18%] lg:gap-0">
      <div className="w-full space-y-3">
        <h4 className="font-semibold">Product of The Day</h4>
        <p className="text-accent-foreground text-xs">Special price only valid today! Visit every day, win!</p>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_x, index) => (
            <div
              key={index}
              className="flex h-10 w-full items-center justify-center rounded-md bg-red-600 text-white lg:size-10"
            >
              05
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="relative">
          <Image
            width={400}
            height={400}
            className="h-[350px] w-full rounded-md border-2 p-2 lg:h-[230px]"
            src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/g1-300x300.jpg"
            alt="Product Of The Day"
          />
          <div className="absolute top-0 flex w-full justify-between p-2">
            <Badge className="h-fit w-fit text-white">% 5</Badge>
            <div className="*:bg-accent flex flex-col gap-3 text-xl *:size-8 *:rounded-md *:p-2">
              <SlHeart title="Add To Wishlist" />
              <IoEyeOutline title="Quick Overview" />
              <PiShoppingCartSimple title="Add To Cart" />
            </div>
          </div>
        </div>
        <h5 className="truncate text-sm font-semibold lg:w-[12rem]">DNA Motoring TOOLS-00266 Green</h5>
        <p className="font-semibold">
          <span className="text-primary">$54.99</span> <del className="text-accent-foreground text-xs">$51.99</del>
        </p>
      </div>
      <div className="w-full space-y-2">
        <span className="text-accent-foreground text-xs font-semibold">Hurry Up!!!</span>
        <Progress title="Total Sold Progress Bar" className="h-2" value={40} />
        <p className="text-sm font-medium">Sold: 20</p>
      </div>
    </div>
  );
};

export default HeroFeatureProducts;
