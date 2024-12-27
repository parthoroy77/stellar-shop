"use client";
import { uploadProduct } from "@/actions/product.action";
import { useForm, zodResolver } from "@repo/utils/hook-form";
import { createProductValidationSchema, TCreateProductValidation } from "@repo/utils/validations";
import { AppButton, Form } from "@ui/index";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import ProductAttributeSelection from "./product-attribute-selection";
import ProductClassifications from "./product-classifications";
import ProductDeliveryInformation from "./product-delivery-information";
import ProductInformationFields from "./product-information-fields";
import ProductInventoryDetails from "./product-inventory-details";
import ProductMediaUpload from "./product-media-upload";
import ProductVariant from "./product-variant";

const defaultValues: TCreateProductValidation = {
  productName: "T Shirt",
  description: "description",
  sku: "DVLDJF",
  price: 30,
  comparePrice: 35,
  productImages: [
    // Images max 3
  ],
  category: {
    collectionId: "9",
    categoryId: "10",
    subCategories: ["11"],
  },
  brandId: "2",
  variants: [
    {
      variantName: "T-Shirt-Red",
      variantAttributes: [{ attributeId: "1", name: "Color", attributeValues: [{ name: "Red", id: "1" }] }],
      price: 30,
      sku: "DKJFDJF",
      stock: 50,
      // variantImage: max 1
    },
    {
      variantName: "T-Shirt-ReBlue",
      variantAttributes: [{ attributeId: "1", name: "Color", attributeValues: [{ name: "Blue", id: "1" }] }],
      price: 30,
      sku: "DKJFDJF",
      stock: 50,
      // variantImage: max 1
    },
  ],
  attributes: [
    {
      attributeId: "1",
      name: "Color",
      attributeValues: [
        { name: "Red", id: "1" },
        { name: "Blue", id: "2" },
      ],
    },
  ],
  shippingOptions: ["1"],
  deliveryInformation: {
    packageHeight: 50,
    packageLength: 50,
    packageWeight: 50,
    packageWidth: 50,
  },
  // if there no variant then stock field will be filed
  stock: 0,
  tags: ["2", "3"],
};

const ProductUploadForm = () => {
  const form = useForm<TCreateProductValidation>({
    resolver: zodResolver(createProductValidationSchema),
    defaultValues: { ...defaultValues },
  });

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleUpload = (data: TCreateProductValidation) => {
    const toastId = toast.loading("Sending request to upload!", { duration: 3000 });
    const { variants, productImages, ...rest } = data;
    const formData = new FormData();

    // Append all non-file fields
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, typeof value === "object" ? JSON.stringify(value) : String(value));
      }
    });

    // Append product images
    productImages.forEach((file, idx) => {
      formData.append(`productImages[${idx}]`, file);
    });

    // Append variants
    if (variants && variants.length > 0) {
      variants.forEach((variant, idx) => {
        const { variantImage, ...restVariant } = variant;

        // Append variant image
        if (variantImage) {
          formData.append(`variants[${idx}][variantImage]`, variantImage);
        }

        // Append other variant fields
        Object.entries(restVariant).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(
              `variants[${idx}][${key}]`,
              typeof value === "object" ? JSON.stringify(value) : String(value)
            );
          }
        });
      });
    }

    startTransition(async () => {
      const result = await uploadProduct(formData);
      if (result.success) {
        toast.success(result.message, { id: toastId });
        router.push("/dashboard");
        form.reset();
      } else {
        toast.error(result.message, { id: toastId });
      }
    });
  };
  return (
    <section className="flex h-full w-full items-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpload)} className="w-full">
          <div className="flex items-center justify-between rounded-md rounded-b-none px-5 py-3">
            <h2 className="text-xl font-medium">Add Product</h2>
            <div className="space-x-3">
              <AppButton
                loading={isPending}
                type="submit"
                variant={"ghost"}
                size={"sm"}
                className="border-secondary border"
              >
                Save Draft
              </AppButton>
              <AppButton
                loading={isPending}
                type="submit"
                variant={"accent"}
                size={"sm"}
                className="border-secondary border"
              >
                Publish Product
              </AppButton>
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
