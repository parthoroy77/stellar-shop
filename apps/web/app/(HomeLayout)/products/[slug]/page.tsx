import PaymentInfo from "@/components/ProductDetail/payment-info";
import ProductDeliveryInfo from "@/components/ProductDetail/product-delivery-info";
import ProductImageSlider from "@/components/ProductDetail/product-image-slider";
import ProductInfoPanel from "@/components/ProductDetail/product-info-panel";
import ProductSellerInfo from "@/components/ProductDetail/product-seller-info";
import { products } from "@/dummyData/products";
import { TProduct } from "@repo/utils/types";
const ProductDetailPage = () => {
  const product = products[0];
  return (
    <div className="py-5 lg:py-10">
      {/* Web Layout */}
      <div className="hidden grid-cols-12 gap-4 lg:grid">
        <div className="col-span-9 grid grid-cols-12 gap-4">
          <div className="col-span-6 flex flex-col space-y-5">
            <ProductImageSlider />
            <OptionalInfo />
          </div>
          <div className="col-span-6 flex flex-col gap-5">
            <ProductInfoPanel product={product as unknown as TProduct} />
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-5">
          <ProductDeliveryInfo />
          <PaymentInfo />
          <ProductSellerInfo />
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="space-y-5 lg:hidden">
        <ProductImageSlider />
        <ProductInfoPanel product={product as unknown as TProduct} />
        <Reviews />
        <ProductSellerInfo />
        <ProductSuggestions />
        <FAQ />
        <Specification />
        <Description />
      </div>
    </div>
  );
};

const ProductMainInfo = () => <div>Product main infos</div>;
const PriceRatingBadgeOptions = () => <div>Price & Ratings & Badges & Options</div>;
const PreferenceOptions = () => <div>Preference Options</div>;
const OptionalInfo = () => <div>Some infos Optional</div>;
const TabNavigation = () => (
  <div>
    <ul className="flex space-x-4 border-b">
      <li>Specification</li>
      <li>Description</li>
      <li>Review</li>
      <li>FAQ</li>
    </ul>
  </div>
);
const ProductSuggestions = () => <div>Product Suggestions</div>;
const Reviews = () => <div>Reviews</div>;
const FAQ = () => <div>FAQ</div>;
const Specification = () => <div>Specification</div>;
const Description = () => <div>Description</div>;

export default ProductDetailPage;
