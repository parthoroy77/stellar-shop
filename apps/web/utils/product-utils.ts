import { TAttribute, TProduct } from "@repo/utils/types";

export function processProductImages(product: TProduct) {
  const productImages = product.images.map((image) => ({
    fileSecureUrl: image.file.fileSecureUrl,
  }));

  if (product.variants.length) {
    product.variants.forEach((variant) => {
      const variantImages = variant.images.map((image) => ({
        fileSecureUrl: image.file.fileSecureUrl,
      }));
      productImages.push(...variantImages);
    });
  }

  return productImages;
}

// Function to format attributes
export function formatAttributes(data: any[]): Partial<TAttribute>[] {
  const attributeMap = new Map<number, Partial<TAttribute>>();

  data.forEach((item) => {
    const {
      attributeValue: {
        id: valueId,
        value,
        attribute: { id: attributeId, name, ...restAttr },
        ...restAttrValue
      },
    } = item;

    if (!attributeMap.has(attributeId)) {
      attributeMap.set(attributeId, {
        id: attributeId,
        name,
        attributeValues: [],
        ...restAttr,
      });
    }

    attributeMap.get(attributeId)?.attributeValues?.push({
      id: valueId,
      value,
      attributeId,
      ...restAttrValue,
    });
  });

  return Array.from(attributeMap.values());
}
