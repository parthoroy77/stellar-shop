import { Badge, Progress } from "@repo/ui";
import { IoEyeOutline } from "react-icons/io5";
import { PiShoppingCartSimple } from "react-icons/pi";
import { SlHeart } from "react-icons/sl";

const HeroFeatureProducts = () => {
  return (
    <div className="w-[18%] h-full border-primary border rounded-lg px-6 flex flex-col justify-evenly items-center">
      <div className="space-y-3">
        <h4 className="font-semibold">Product of The Day</h4>
        <p className="text-xs">Special price only valid today! Visit every day, win!</p>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((x) => (
            <div className="bg-red-600  size-10 rounded-md text-white flex justify-center items-center">05</div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="relative">
            <img
              className="border-2 rounded-md p-2"
              src="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/g1-300x300.jpg"
              alt="Product Of The Day"
            />
            <div className="absolute top-0 p-2 w-full flex justify-between">
              <Badge className="text-white h-fit w-fit">% 5</Badge>
              <div className="flex flex-col gap-3 text-xl *:bg-accent *:size-8 *:p-2 *:rounded-md">
                <SlHeart title="Add To Wishlist" />
                <IoEyeOutline title="Quick Overview" />
                <PiShoppingCartSimple title="Add To Cart" />
              </div>
            </div>
          </div>
          <h4 className="font-semibold text-sm">DNA Motoring TOOLS-00266 Green</h4>
          <p className="text-sm font-semibold">
            <del className="text-primary">$54.99</del> $51.99
          </p>
        </div>
      </div>
      <div className="space-y-2 w-full">
        <Progress className="h-2" value={40} />
        <p className="text-xs">Sold: 20</p>
      </div>
    </div>
  );
};

export default HeroFeatureProducts;
