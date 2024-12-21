import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import ProductBrandSelection from "./product-brand-selection";
import ProductCategorySelection from "./product-category-selection";

const ProductClassifications = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  return (
    <div className="!space-y-5">
      <h3 className="text-lg leading-none">Product Classifications</h3>
      <ProductCategorySelection form={form} />
      <ProductBrandSelection form={form} />
    </div>
  );
};

export default ProductClassifications;
