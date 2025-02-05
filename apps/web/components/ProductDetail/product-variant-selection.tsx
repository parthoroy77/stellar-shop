import { useProductVariantSelector } from "@/hooks/use-product-variant-selector";
import { TProduct } from "@repo/utils/types";
import { Button } from "@ui/index";
import { memo } from "react";

const ProductVariantSelection = ({ variants }: { variants: TProduct["variants"] }) => {
  const { availableAttrOptions, handleSelectAttribute, isValidCombination, isAttributeSelected } =
    useProductVariantSelector(variants);
  return (
    <div className="space-y-3">
      {availableAttrOptions.map((attribute) => {
        return (
          <div className="space-y-2">
            <h5 className="font-medium">{attribute.name}</h5>
            <div className="flex flex-wrap gap-2">
              {attribute.attributeValues?.map((value) => (
                <Button
                  key={value.id}
                  disabled={!isValidCombination(attribute.id!, value.id)}
                  onClick={() => handleSelectAttribute(attribute.id!, value.id)}
                  size={"sm"}
                  variant={isAttributeSelected(attribute.id!, value.id) ? "default" : "accent"}
                  className="h-7 border px-4 py-0"
                >
                  {value.value}
                </Button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(ProductVariantSelection);
