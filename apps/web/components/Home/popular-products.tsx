import { Button } from "@repo/ui";
import { BsArrowRight } from "react-icons/bs";
import ProductsSlider from "./products-slider";
import SideBanner from "./side-banner";

const PopularProducts = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-[20%]">
        <SideBanner
          heading="Customers Choice"
          subHeading="Grab Before Stock Out"
          className="bg-[url('https://ninetheme.com/themes/fitment/wp-content/uploads/2023/08/blog-post-5.png')] text-white bg-blend-darken"
        />
      </div>
      <div className="w-full space-y-5 lg:w-[80%]">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium lg:text-xl">Popular Products</h5>
          <Button variant={"outline"} size={"sm"} className="flex gap-2 rounded-full text-xs">
            Check All Products <BsArrowRight />
          </Button>
        </div>
        <ProductsSlider />
      </div>
    </div>
  );
};

export default PopularProducts;
