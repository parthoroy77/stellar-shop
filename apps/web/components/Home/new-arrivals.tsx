import { getNewlyArrivedProducts } from "@/actions/product";
import ProductShowcase from "./product-showcase";
import SideBanner from "./side-banner";

const NewArrivals = async () => {
  const products = await getNewlyArrivedProducts(`limit=8`);
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-72">
        <SideBanner
          heading="Newly Arrived"
          subHeading="Free Shipping Over $50"
          className="text-accent-foreground bg-[url('/ui-images/sidebar-2.jpg')] bg-cover bg-center"
        />
      </div>
      <div className="w-full space-y-5 lg:w-[80%]">
        <ProductShowcase products={products.data || []} />
      </div>
    </div>
  );
};

export default NewArrivals;
