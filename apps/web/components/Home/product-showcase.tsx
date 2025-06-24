import { TProduct } from "@repo/utils/types";
import DemoProductCard from "../ui/demo-product-card";
import ProductCard from "../ui/product-card";
interface Props {
  products: TProduct[];
  isDemo?: boolean;
  demoItems?: number;
}
const ProductShowcase = ({ isDemo = false, demoItems = 4, products }: Props) => {
  return isDemo ? (
    <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 lg:gap-3">
      {Array.from({ length: demoItems ?? 4 }).map((_x, i) => (
        <DemoProductCard key={i} />
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-1 lg:grid-cols-4 lg:gap-3">
      {products.map((product, i) => (
        <ProductCard product={product} key={i} />
      ))}
    </div>
  );
};

export default ProductShowcase;
