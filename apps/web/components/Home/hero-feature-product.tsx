import { Progress } from "@repo/ui";
import Image from "next/image";
import demoProduct from "../../public/ui-images/demo-product.jpg";

const HeroFeatureProducts = () => {
  return (
    <div className="border-primary flex h-full w-full flex-col items-center justify-between gap-3 space-y-3 rounded-lg border p-6 lg:w-[18%] lg:gap-0">
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
      <Image
        className="h-[350px] w-full rounded-md border p-2 lg:h-[220px]"
        src={demoProduct}
        alt="Product Of The Day"
      />
      <div className="w-full space-y-1">
        <h5 className="line-clamp-2 text-sm font-semibold">Ceramic Pots and Pans Cookware Set Detachable Handle</h5>
        <p className="font-semibold">
          <span className="text-primary">$185</span> <del className="text-accent-foreground text-xs">$212.59</del>
        </p>
        <span className="text-accent-foreground text-xs font-semibold">Hurry Up!!!</span>
        <Progress title="Total Sold Progress Bar" className="h-2" value={40} />
        <p className="text-sm font-medium">Sold: 20</p>
      </div>
    </div>
  );
};

export default HeroFeatureProducts;
