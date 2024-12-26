import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import ProductBrandSelection from "./product-brand-selection";
import ProductCategorySelection from "./product-category-selection";
import ProductTagsSelection from "./product-tags-selection";

const ProductClassifications = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  return (
    <div>
      <div className="space-y-1">
        <h3 className="text-lg leading-none">Product Classifications</h3>
        <p className="text-accent-foreground text-xs">Define Category, Brand & Tags</p>
      </div>
      <hr />
      <ProductCategorySelection form={form} />
      <hr />
      <ProductBrandSelection form={form} />
      <hr />
      <ProductTagsSelection form={form} />
    </div>
  );
};

export default ProductClassifications;
