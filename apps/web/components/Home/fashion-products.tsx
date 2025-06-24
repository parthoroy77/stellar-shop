import { getProductByCategory } from "@/actions/product";
import ProductShowcase from "./product-showcase";
import SideBanner from "./side-banner";

const FashionProducts = async () => {
  const products = await getProductByCategory(`fashion`, { limit: "8", order: "asc" });
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-72">
        <SideBanner
          heading="Your Style, Your Story."
          subHeading="Grab Before Stock Out"
          className="bg-[url('/ui-images/fashion-sidebar.jpg')] bg-cover bg-center text-white"
          textBlur
        />
      </div>
      <div className="w-full space-y-5 lg:w-[80%]">
        <ProductShowcase products={products.data || []} />
      </div>
    </div>
  );
};

export default FashionProducts;
