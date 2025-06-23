import { Button } from "@repo/ui";
import { BsArrowRight } from "react-icons/bs";
import CustomPagination from "../ui/custom-pagination";
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
          <Button variant={"outline"} size={"sm"} className="flex gap-2 rounded-full text-xs">
            Check All Products <BsArrowRight />
          </Button>
        </div>
        <ProductShowcase isDemo products={[]} />
        <CustomPagination />
      </div>
    </div>
  );
};

export default PopularProducts;
