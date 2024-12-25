import { cartesian, toKebabCase, toTitleCase } from "@repo/utils/functions";

interface Props {
  productName: string;
  attributes: {
    attributeId: string;
    name: string;
    attributeValues: { id: string; name: string }[];
  }[];
}

export const generateProductVariants = ({ productName, attributes }: Props) => {
  // Generate all combinations of attribute values
  const combinations = cartesian(...attributes.map((attr) => attr.attributeValues.map((x) => x.name)));

  // Map combinations to variants
  const variants = combinations.map((combination) => {
    // Map the combination to the relevant attributes
    const variantAttributes = attributes.map((attribute) => ({
      ...attribute,
      attributeValues: attribute.attributeValues.filter((value) => combination.includes(value.name)),
    }));

    return {
      variantName: `${toTitleCase(toKebabCase(productName))}-${combination.join("-")}`,
      price: 0,
      sku: "",
      variantImage: null,
      variantAttributes, // Include only relevant attributes
      stock: 0,
    };
  });

  return variants;
};
