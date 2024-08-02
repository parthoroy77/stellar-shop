import PreferenceSelectOptions from "./preference-select-options";
import ProductActionButtons from "./product-action-buttons";
import ProductPrice from "./product-price";
import ProductRatingTagsOption from "./product-rating-tag-option";

const ProductInfoPanel = () => {
  return (
    <div className="space-y-5 p-4">
      <h1 className="text-2xl font-medium">Multi-Vehicle Automatic Transmission Fluid</h1>
      <ProductRatingTagsOption />
      <ProductPrice />
      <PreferenceSelectOptions />
      <ProductActionButtons />
    </div>
  );
};

export default ProductInfoPanel;
