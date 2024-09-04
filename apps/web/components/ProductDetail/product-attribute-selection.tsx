import { TAttribute } from "@repo/utils/types";
import { Button } from "@ui/index";
import { FC, useState } from "react";

interface Props {
  attributes: TAttribute[];
}

const ProductAttributeSelection: FC<Props> = ({ attributes }) => {
  return (
    <div className="space-y-3">
      {attributes.map((attribute) => (
        <ProductAttributeCard key={attribute.id} attribute={attribute} />
      ))}
    </div>
  );
};

const ProductAttributeCard = ({ attribute }: { attribute: TAttribute }) => {
  const [selectedAttribute, setSelectedAttribute] = useState<null | number>(null);

  const handleAttributeSelection = (id: number) => {
    if (id === selectedAttribute) {
      setSelectedAttribute(null);
    } else {
      setSelectedAttribute(id);
    }
  };
  return (
    <div className="space-y-2">
      <h5 className="font-medium">{attribute.name}</h5>
      <div className="flex flex-wrap gap-2">
        {attribute.attributeValues?.map((value) => (
          <Button
            key={value.id}
            onClick={() => handleAttributeSelection(value.id)}
            size={"sm"}
            variant={selectedAttribute === value.id ? "default" : "accent"}
            className="h-7 border px-4 py-0"
          >
            {value.value}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductAttributeSelection;
