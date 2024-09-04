import PaymentInfo from "@/components/ProductDetail/payment-info";
import ProductDeliveryInfo from "@/components/ProductDetail/product-delivery-info";
import ProductImageGallery from "@/components/ProductDetail/product-image-gallery";
import ProductInfoPanel from "@/components/ProductDetail/product-info-panel";
import ProductReviewContainer from "@/components/ProductDetail/product-review-container";
import ProductSellerInfo from "@/components/ProductDetail/product-seller-info";
import ProductSuggestion from "@/components/ProductDetail/product-suggestions";
import ProductTabNavigation from "@/components/ProductDetail/product-tab-navigation";
import BreadcrumbMenu from "@/components/ui/breamcrumb-menu";
import { products } from "@/dummyData/products";
import { TProduct } from "@repo/utils/types";
const items = [
  { href: "#", label: "Categories" },
  { href: "#", label: "Fashion" },
  { href: "#", label: "Kids Clothings" },
  { href: "#", label: "Kids Accessories" },
  { href: "#", label: "Comfortable and Fashionable Exclusive T-shirt" },
];
const ProductDetailPage = () => {
  const product = products[0];
  return (
    <section className="space-y-5 py-5">
      <BreadcrumbMenu items={items} />
      <div className="">
        {/* Web Layout */}
        <div className="hidden grid-cols-12 gap-4 lg:grid">
          {/* left section */}
          <section className="col-span-9 grid h-fit grid-cols-12 gap-5">
            <div className="col-span-12 grid h-fit grid-cols-12 gap-4">
              <div className="col-span-6 flex h-fit flex-col space-y-5">
                <ProductImageGallery />
              </div>
              <div className="col-span-6 flex h-fit flex-col gap-5">
                <ProductInfoPanel product={product as unknown as TProduct} />
              </div>
            </div>
            <div className="col-span-12">
              <ProductTabNavigation product={product as unknown as TProduct} />
            </div>
          </section>
          {/* Right Section */}
          <section className="col-span-3 flex flex-col gap-5">
            <ProductDeliveryInfo />
            <PaymentInfo />
            <ProductSellerInfo />
            <hr />
            <ProductSuggestion />
          </section>
        </div>

        {/* Mobile Layout */}
        <div className="space-y-5 lg:hidden">
          <ProductImageGallery />
          <ProductInfoPanel product={product as unknown as TProduct} />
          <ProductReviewContainer product={product as unknown as TProduct} />
          <ProductSellerInfo />
          <FAQ />
          <Specification />
          <Description />
        </div>
      </div>
    </section>
  );
};

const TabNavigation = () => (
  <div className="h-full w-full bg-gray-400">
    <ul className="flex space-x-4 border-b">
      <li>Specification</li>
      <li>Description</li>
      <li>Review</li>
      <li>FAQ</li>
    </ul>
  </div>
);
const Reviews = () => <div>Reviews</div>;
const FAQ = () => <div>FAQ</div>;
const Specification = () => <div>Specification</div>;
const Description = () => <div>Description</div>;

export default ProductDetailPage;
