"use client";

import { formatAttributes } from "@/utils/product-utils";
import { TProductVariant } from "@repo/utils/types";
import { useCallback, useMemo, useState } from "react";

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
  const isValidCombination = useCallback(
    (attributeId: number, valuedId: number) => {
      const updatedAttributes = { ...selectedAttributes, [attributeId]: valuedId };
      return variants.some((v) =>
        // Iterate over selected attribute combination
        Object.entries(updatedAttributes).every(([attrId, valId]) =>
          // Check for variant this combination possible or not
          v.attributes.some(
            (variantAttribute) =>
              variantAttribute.attributeValue.attribute.id === +attrId && variantAttribute.attributeValue.id === valId
          )
        )
      );
    },
    [selectedAttributes, variants]
  );

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

  // Check is attribute select
  const isAttributeSelected = useCallback(
    (attributeId: number, valueId: number) => {
      return selectedAttributes[attributeId] === valueId;
    },
    [selectedAttributes]
  );

  return {
    availableAttrOptions,
    isValidCombination,
    selectedVariant,
    handleSelectAttribute,
    isAttributeSelected,
  };
};
