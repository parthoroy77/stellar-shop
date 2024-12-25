import { generateProductVariants } from "@/utils/generate-product-variants";
import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import { AppButton, Skeleton } from "@ui/index";
import { useState } from "react";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { toast } from "sonner";
import VariantManager from "./variant-manager";

const ProductVariant = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  const [loading, setLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const productName = form.watch("productName");
  const attributes = form.getValues("attributes") || [];
  const hasAttributes = attributes.some((attr) => attr.attributeId && attr.attributeValues.length > 0);

  const handleGenerate = async () => {
    setLoading(true);
    if (!productName) toast.error("Please add product name first!");
    if (hasAttributes) {
      const variants = generateProductVariants({
        productName,
        attributes: attributes as any,
      });
      form.setValue("variants", variants);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
      setIsGenerated(true);
    } else {
      toast.error("Please add attribute before generating variants");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3>Product Variants</h3>
          <p className="text-accent-foreground text-xs">
            Depending on your selected attributes, product variants will be generated!
          </p>
          <p className="text-accent-foreground text-xs">
            After that upload variant image, in case want to delete or modify then reorder the attributes and generate
            again!
          </p>
        </div>
        <AppButton
          loading={loading}
          type="button"
          variant="accent"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleGenerate}
        >
          <span>Generate Variants</span>
          <VscGitPullRequestCreate size={15} aria-hidden="true" />
        </AppButton>
      </div>
      <hr />
      {!loading ? (
        hasAttributes ? (
          isGenerated && <VariantManager form={form} />
        ) : (
          <p className="text-accent-foreground text-center text-sm font-medium">First select Attributes</p>
        )
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6" />
      <Skeleton className="h-6" />
      <Skeleton className="h-6" />
      <Skeleton className="h-6" />
    </div>
  );
};

export default ProductVariant;
