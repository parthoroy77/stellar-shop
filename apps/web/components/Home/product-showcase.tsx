import { TProduct } from "@repo/utils/types";
import DemoProductCard from "../ui/demo-product-card";
import ProductCard from "../ui/product-card";
interface Props {
  products: TProduct[];
  isDemo?: boolean;
}
const ProductShowcase = ({ isDemo = true, products }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 lg:gap-3">
      {isDemo ? (
        <>
          {Array.from({ length: 4 }).map((_x, i) => (
            <DemoProductCard key={i} />
          ))}
        </>
      ) : (
        <>
          {products.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductShowcase;
