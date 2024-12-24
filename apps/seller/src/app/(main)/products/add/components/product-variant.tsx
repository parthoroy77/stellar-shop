import { UseFormReturn } from "@repo/utils/hook-form";
import { TCreateProductValidation } from "@repo/utils/validations";
import { Button, Skeleton } from "@ui/index";
import { useMemo, useState } from "react";
import { VscGitPullRequestCreate } from "react-icons/vsc";

const ProductVariant = ({ form }: { form: UseFormReturn<TCreateProductValidation> }) => {
  const [loading] = useState(false);

  const attributes = form.getValues("attributes") || [];

  const hasAttributes = useMemo(
    () => attributes.some((attr) => attr.attributeId && attr.attributeValues.length),
    [attributes]
  );

  const handleGenerate = () => {};

  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3>Product Variants</h3>
          <p className="text-accent-foreground text-sm">
            Depending on your selected attributes, product variants will be generated!
          </p>
        </div>
        <Button type="button" variant="accent" size="sm" className="flex items-center gap-2" onClick={handleGenerate}>
          <span>Generate Variants</span>
          <VscGitPullRequestCreate size={15} aria-hidden="true" />
        </Button>
      </div>
      <hr />
      {!loading ? (
        hasAttributes ? (
          <div></div>
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
