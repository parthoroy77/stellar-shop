import { cartesian, toKebabCase, toTitleCase } from "@repo/utils/functions";

interface Props {
  productName: string;
  attributes: {
    name: string;
    attributeValues: string[];
  }[];
}

export const generateProductVariants = ({ productName, attributes }: Props) => {
  const combinations = cartesian(attributes.map((attr) => attr.attributeValues));

  const variants = combinations.map((combination) => ({
    variantName: `${toTitleCase(toKebabCase(productName))}-${combination.join("-")}`,
    price: null,
    sku: "",
    variantImages: null,
    variantAttributes: [],
  }));

  return variants;
};
