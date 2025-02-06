import { TAttribute } from "@repo/utils/types";
import { Button } from "@ui/index";
import { FC, memo } from "react";
interface Props {
  availableAttrOptions: Partial<TAttribute>[];
  handleSelectAttribute: (attributeId: number, valueId: number) => void;
  isValidCombination: (attributeId: number, valueId: number) => boolean;
  isAttributeSelected: (attributeId: number, valueId: number) => boolean;
}

const ProductVariantSelection: FC<Props> = ({
  availableAttrOptions,
  handleSelectAttribute,
  isValidCombination,
  isAttributeSelected,
}) => {
  return (
    <div className="space-y-3">
      {availableAttrOptions.map((attribute) => {
        return (
          <div className="space-y-2" key={attribute.id}>
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
