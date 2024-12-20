"use client";
import { useForm } from "@repo/utils/hook-form";
import { Form } from "@ui/index";
import ProductAttributeSelection from "./product-attribute-selection";
import ProductClassifications from "./product-classifications";
import ProductInformationFields from "./product-information-fields";
import ProductMediaUpload from "./product-media-upload";

const ProductUploadForm = () => {
  const form = useForm();
  return (
    <section className="flex h-full w-full items-start">
      <div className="h-full w-[75%] border-r">
        <Form {...form}>
          <form className="h-full divide-y *:space-y-3 *:px-5 *:py-5 [&_h3]:text-lg [&_h3]:leading-none">
            <ProductMediaUpload form={form} />
            <ProductInformationFields form={form} />
            <ProductClassifications form={form} />

            <ProductAttributeSelection form={form} />
            <div>
              <h3 className="text-lg">Product Variants</h3>
            </div>
            <div>
              <h3 className="text-lg">Product Delivery Information</h3>
            </div>
            <div>
              <h3 className="text-lg">Product Delivery Information</h3>
            </div>
          </form>
        </Form>
      </div>
      <aside className="h-full w-[25%] px-5 py-3">Here will be timeline</aside>
    </section>
  );
};

export default ProductUploadForm;
