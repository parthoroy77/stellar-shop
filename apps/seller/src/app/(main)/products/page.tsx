import { getAllProducts } from "@/actions/product.action";
import { getSellerProfile } from "@/actions/seller.action";
import { notFound } from "next/navigation";
import ProductsView from "./components/products-view";

const ProductsPage = async () => {
  const seller = await getSellerProfile();
  if (!seller) {
    notFound();
  }
  const result = await getAllProducts(seller.id);
  const products = result.data || [];
  return (
    <div className="divide-y *:p-5">
      <h2 className="text-xl font-medium">Products ({products.length})</h2>
      <ProductsView products={products} />
    </div>
  );
};

export default ProductsPage;
