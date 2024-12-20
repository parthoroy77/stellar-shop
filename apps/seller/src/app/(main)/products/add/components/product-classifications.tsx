import ProductCategorySelection from "./product-category-selection";

const ProductClassifications = ({ form }: { form: any }) => {
  return (
    <div>
      <h3 className="text-lg">Product Classifications</h3>
      <ProductCategorySelection form={form} />
    </div>
  );
};

export default ProductClassifications;
