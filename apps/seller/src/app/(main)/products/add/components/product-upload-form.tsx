"use client";
import { useForm, zodResolver } from "@repo/utils/hook-form";
import { createProductValidationSchema, TCreateProductValidation } from "@repo/utils/validations";
import { Button, Form } from "@ui/index";
import ProductAttributeSelection from "./product-attribute-selection";
import ProductClassifications from "./product-classifications";
import ProductDeliveryInformation from "./product-delivery-information";
import ProductInformationFields from "./product-information-fields";
import ProductInventoryDetails from "./product-inventory-details";
import ProductMediaUpload from "./product-media-upload";
import ProductVariant from "./product-variant";

const defaultValues: TCreateProductValidation = {
  productName: "",
  description: "",
  sku: "",
  price: 0,
  comparePrice: 0,
  productImages: [],
  category: {
    collectionId: "",
    categoryId: "",
    subCategories: [],
  },
  brandId: "",
  variants: [],
  attributes: [],
  shippingOptions: [],
  deliveryInformation: {
    packageHeight: 0,
    packageLength: 0,
    packageWeight: 0,
    packageWidth: 0,
  },
  stock: 0,
  tags: [],
};

const ProductUploadForm = () => {
  const form = useForm<TCreateProductValidation>({
    resolver: zodResolver(createProductValidationSchema),
    defaultValues: { ...defaultValues },
  });

  return (
    <section className="flex h-full w-full items-start">
      <Form {...form}>
        <form className="w-full">
          <div className="flex items-center justify-between rounded-md rounded-b-none px-5 py-3">
            <h2 className="text-xl font-medium">Add Product</h2>

            <div className="space-x-3">
              <Button variant={"ghost"} size={"sm"} className="border-secondary border">
                Save Draft
              </Button>
              <Button variant={"accent"} size={"sm"} className="border-secondary border">
                Publish Product
              </Button>
            </div>
          </div>
          <hr />
          <div className="[&_input]:bg-accent/30 flex h-full w-full *:*:space-y-3 *:divide-y *:*:px-5 *:*:py-5 [&_h3]:text-base [&_h3]:leading-none [&_input]:border-2">
            <div className="w-[70%] border-r">
              <ProductMediaUpload form={form} />
              <ProductInformationFields form={form} />
              <ProductAttributeSelection form={form} />
              <ProductVariant form={form} />
              <ProductInventoryDetails form={form} />
            </div>
            <div className="h-full w-[30%]">
              <ProductClassifications form={form} />
              <ProductDeliveryInformation form={form} />
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ProductUploadForm;
