import { getBestSellingProducts } from "@/actions/product";
import { Button } from "@repo/ui";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import ProductCard from "../ui/product-card";

const BestSellers = async () => {
  const products = await getBestSellingProducts(10);
  return (
    <div className="space-y-5 border-b-2 pb-5">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-medium lg:text-xl">Best Sellers</h5>
        <Link href={"/search"}>
          <Button variant={"outline"} size={"sm"} className="flex gap-2 rounded-full text-xs">
            Check All Products <BsArrowRight />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {products && products.map((product, i) => <ProductCard product={product} key={i} />)}
      </div>
    </div>
  );
};

export default BestSellers;
