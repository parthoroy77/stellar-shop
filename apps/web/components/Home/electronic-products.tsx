import { getProductByCategory } from "@/actions/product";
import ProductShowcase from "./product-showcase";
import SideBanner from "./side-banner";

const ElectronicProducts = async () => {
  const products = await getProductByCategory(`home-appliances`, { limit: "8", order: "desc" });
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-72">
        <SideBanner
          heading="Powering Your Home, One Appliance at a Time."
          subHeading="Grab Before Stock Out"
          className="bg-[url('/ui-images/electronic-sidebar.jpg')] bg-cover bg-left text-white"
          textBlur
        />
      </div>
      <div className="w-full space-y-5 lg:w-[80%]">
        <ProductShowcase products={products.data || []} />
      </div>
    </div>
  );
};

export default ElectronicProducts;
