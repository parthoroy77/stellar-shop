import { getProductBySearch } from "@/actions/product";
import ProductShowcase from "./product-showcase";
import SideBanner from "./side-banner";

const GroceryProducts = async () => {
  const products = await getProductBySearch({ categories: `groceries&food-beverages`, limit: "8", page: "3" });
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-72">
        <SideBanner
          heading="Your Daily Dose of Fresh – Groceries & Dairy Inside."
          subHeading="Grab Before Stock Out"
          className="bg-[url('/ui-images/grocery-sidebar.jpg')] bg-cover bg-left text-white"
          textBlur
        />
      </div>
      <div className="w-full space-y-5 lg:w-[80%]">
        <ProductShowcase products={products.data || []} />
      </div>
    </div>
  );
};

export default GroceryProducts;
