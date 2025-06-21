import DemoProductCard from "@/components/ui/demo-product-card";
import { TProduct } from "@repo/utils/types";
import ProductCard from "../ui/product-card";

const ProductListing = ({ isDemo = true, products = [] }: { products: TProduct[]; isDemo: boolean }) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5">
      {!isDemo ? (
        products.length ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="col-span-2 flex h-96 w-full items-center justify-center md:col-span-3 lg:col-span-4">
            <span>Not product found!</span>
          </div>
        )
      ) : (
        Array.from({ length: 8 }).map((_x, index) => <DemoProductCard key={index} />)
      )}
    </div>
  );
};

export default ProductListing;
