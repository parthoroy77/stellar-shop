"use client";
import { uploadProduct } from "@/actions/product.action";
import { generateUniqueId } from "@repo/utils/functions";
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
  productName: "",
  description: "",
  sku: generateUniqueId("", 12),
  price: 0,
  comparePrice: 0,
  productImages: [],
  category: {
    collectionId: "",
    categoryId: "",
    subCategories: [""],
  },
  brandId: "2",
  variants: [],
  attributes: [],
  shippingOptions: [],
  deliveryInformation: {
    packageHeight: 50,
    packageLength: 350,
    packageWeight: 0.5,
    packageWidth: 350,
  },
  // if there no variant then stock field will be filed
  stock: 0,
  tags: [],
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
          <div className="[&_input]:bg-accent/30 flex h-full w-full flex-col *:*:space-y-3 *:divide-y *:*:px-5 *:*:py-5 lg:flex-row [&_h3]:text-base [&_h3]:leading-none [&_input]:border-2">
            <div className="border-r lg:w-[70%]">
              <ProductMediaUpload form={form} />
              <ProductInformationFields form={form} />
              <ProductAttributeSelection form={form} />
              <ProductVariant form={form} />
              <ProductInventoryDetails form={form} />
            </div>
            <div className="h-full lg:w-[30%]">
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
