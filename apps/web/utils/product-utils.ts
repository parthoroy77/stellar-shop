import { BreadcrumbMenuProps } from "@/components/ui/breadcrumb-menu";
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

type TAttrData = {
  attributeValue: {
    id: number;
    value: string;
    attribute: {
      id: number;
      name: string;
    };
  };
}[];

// Function to format attributes
export function formatAttributes(data: TAttrData): Partial<TAttribute>[] {
  const attributeMap = new Map<number, Partial<TAttribute>>();

  data.forEach((item) => {
    const {
      attributeValue: {
        id: valueId,
        value,
        attribute: { id: attributeId, name },
      },
    } = item;

    if (!attributeMap.has(attributeId)) {
      attributeMap.set(attributeId, {
        id: attributeId,
        name,
        attributeValues: [],
      });
    }

    const existingAttribute = attributeMap.get(attributeId);
    if (existingAttribute) {
      // Ensure uniqueness using a Set
      const uniqueValues = new Set(existingAttribute.attributeValues?.map((val) => val.id));
      if (!uniqueValues.has(valueId)) {
        //@ts-ignore (Ts ignore because we are omitting createdAt, updatedAt which cause type error)
        existingAttribute.attributeValues?.push({
          id: valueId,
          value,
          attributeId,
        });
      }
    }
  });

  return Array.from(attributeMap.values());
}

export function formatProductBreadcrumb(data: TProduct["categories"]) {
  let breadcrumb: BreadcrumbMenuProps[] = [];

  const sortedData = data.sort((a, b) => {
    const levelOrder = { COLLECTION: 1, CATEGORY: 2, SUB_CATEGORY: 3 };
    return levelOrder[a.category.level] - levelOrder[b.category.level];
  });

  sortedData.forEach((item) => {
    breadcrumb.push({
      label: item.category.categoryName,
      href: "/categories/" + item.category.urlSlug,
    });
  });

  return breadcrumb;
}
