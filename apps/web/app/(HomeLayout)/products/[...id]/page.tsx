const ProductDetailPage = () => {
  return (
    <div className="py-5 lg:py-10">
      {/* Web Layout */}
      
      {/* Mobile Layout */}
      <div className="space-y-5 *:border *:p-4 lg:hidden">
        <ProductImageSlider />
        <ProductMainInfo />
        <PriceRatingBadgeOptions />
        <PreferenceOptions />
        <DeliveryPaymentInfo />
        <div>
          <button>Buy Now</button>
        </div>
        <Reviews />
        <SellerInfo />
        <ProductSuggestions />
        <FAQ />
        <Specification />
        <Description />
      </div>
    </div>
  );
};

const ProductImageSlider = () => <div>Product Image Slider with magnification effect</div>;
const ProductMainInfo = () => <div>Product main infos</div>;
const PriceRatingBadgeOptions = () => <div>Price & Ratings & Badges & Options</div>;
const DeliveryPaymentInfo = () => <div>Delivery Infos & Payment Infos</div>;
const PreferenceOptions = () => <div>Preference Options</div>;
const SellerInfo = () => <div>Seller Info</div>;
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
