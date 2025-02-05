"use client";

import { formatAttributes } from "@/utils/product-utils";
import { TProductVariant } from "@repo/utils/types";
import { useMemo, useState } from "react";

export const useProductVariantSelector = (variants: TProductVariant[]) => {
  const [selectedAttributes, setSelectedAttributes] = useState<Record<number, number>>({});

  // Format available attribute options of a variant
  const availableAttrOptions = useMemo(() => {
    const attributes = variants.flatMap((v) => v.attributes);
    return formatAttributes(attributes);
  }, [variants]);

  // handle select attributes
  const handleSelectAttribute = (attributeId: number, valueId: number) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeId]: valueId,
    }));
  };

  // Check is valid combination
  const isValidCombination = (attributeId: number, valuedId: number) => {
    const updatedAttribute = { ...selectedAttributes, [attributeId]: valuedId };

    variants.some((v) =>
      // Iterate over selected attribute combination
      Object.entries(updatedAttribute).map(([attrId, valId]) =>
        // Check for variant this combination possible or not
        v.attributes.some(
          (variantAttribute) =>
            variantAttribute.attributeValue.attributeId === +attrId && variantAttribute.attributeValue.id === valId
        )
      )
    );
  };

  // Find the selected variant
  const selectedVariant = useMemo(() => {
    return (
      variants.find((variant) =>
        Object.entries(selectedAttributes).every(([attrId, valueId]) =>
          variant.attributes.some(
            (attr) => attr.attributeValue.attribute.id === Number(attrId) && attr.attributeValue.id === valueId
          )
        )
      ) || null
    );
  }, [selectedAttributes, variants]);

  return {
    availableAttrOptions,
    isValidCombination,
    selectedVariant,
    handleSelectAttribute,
  };
};
