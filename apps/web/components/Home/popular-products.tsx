import { Button } from "@repo/ui";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import ProductShowcase from "./product-showcase";
import SideBanner from "./side-banner";

const PopularProducts = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-72">
        <SideBanner
          heading="Customers Choice"
          subHeading="Grab Before Stock Out"
          className="text-accent-foreground bg-[url('/ui-images/sidebar-5.jpg')] bg-cover bg-left"
        />
      </div>
      <div className="w-full space-y-5 lg:w-[80%]">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium lg:text-xl">Popular Products</h5>
          <Link href={"/search"}>
            <Button variant={"outline"} size={"sm"} className="flex gap-2 rounded-full text-xs">
              Check All Products <BsArrowRight />
            </Button>
          </Link>
        </div>
        <ProductShowcase isDemo products={[]} />
      </div>
    </div>
  );
};

export default PopularProducts;
