import { fetcher } from "@/lib/fetcher";
import { TProduct } from "@repo/utils/types";
import CustomPagination from "../ui/custom-pagination";
import ProductShowcase from "./product-showcase";
import SideBanner from "./side-banner";

const NewArrivals = async () => {
  const result = await fetcher<TProduct[]>("/products/new-arrivals", { next: { revalidate: 300 } });
  const products = result.data || [];

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="w-full lg:w-[20%]">
        <SideBanner
          heading="Newly Arrived"
          subHeading="Free Shipping Over $50"
          image="https://ninetheme.com/themes/fitment/wp-content/uploads/2023/12/TSW-SNETTERTON-300x300.png"
        />
      </div>
      <div className="w-full space-y-5 lg:w-[80%]">
        <ProductShowcase isDemo={!(products.length > 0)} products={products} />
        {!(products.length > 0) && <CustomPagination />}
      </div>
    </div>
  );
};

export default NewArrivals;
