import { Prisma } from "@repo/prisma/client";
import { PRODUCT_SEARCHABLE_FIELDS } from "./product.constants";
import { TProductFilters } from "./product.types";

export const parseProductData = (body: Record<string, any>, files: Express.Multer.File[]) => {
  const productImages: Express.Multer.File[] = [];

  // Normalize productImages
  files.forEach((file) => {
    if (file.fieldname.startsWith("productImages")) {
      productImages.push(file);
    }
  });

  // Normalize variant images and associate with their respective variants
  const variantFiles = files.filter((file) => file.fieldname.startsWith("variants"));

  const transformedVariants =
    body?.variants &&
    body.variants.length > 0 &&
    body.variants.map((variant: any, index: number) => {
      const variantFile = variantFiles.find((file) => file.fieldname === `variants[${index}][variantImage]`);
      return {
        ...variant,
        price: parseFloat(variant.price),
        stock: parseInt(variant.stock, 10),
        variantAttributes: JSON.parse(variant.variantAttributes),
        variantImage: variantFile || null,
        isDefault: JSON.parse(variant.isDefault),
      };
    });

  return {
    ...body,
    price: parseFloat(body.price),
    comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : undefined,
    stock: parseInt(body.stock, 10),
    category: JSON.parse(body.category),
    attributes: JSON.parse(body.attributes),
    deliveryInformation: JSON.parse(body.deliveryInformation),
    shippingOptions: JSON.parse(body.shippingOptions),
    tags: JSON.parse(body.tags),
    productImages,
    variants: transformedVariants || [],
  };
};

export const getProductDetailSelectOptions = () => {
  const selectOptions: Prisma.ProductSelect = {
    id: true,
    productName: true,
    urlSlug: true,
    description: true,
    sku: true,
    price: true,
    comparePrice: true,
    stock: true,
    sellerId: true,
    images: {
      select: {
        file: {
          select: {
            fileSecureUrl: true,
          },
        },
      },
    },
    // Product attribute not needed as we are focusing only on variants
    // attributes: {
    //   select: {
    //     attributeValue: {
    //       select: {
    //         id: true,
    //         value: true,
    //         attribute: {
    //           select: {
    //             id: true,
    //             name: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    variants: {
      where: {
        status: "ACTIVE",
      },
      select: {
        id: true,
        variantName: true,
        description: true,
        price: true,
        stock: true,
        isDefault: true,
        images: {
          select: {
            file: {
              select: {
                fileSecureUrl: true,
              },
            },
          },
        },
        attributes: {
          select: {
            attributeValue: {
              select: {
                id: true,
                value: true,
                attribute: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    },
    categories: {
      select: {
        category: {
          select: {
            categoryName: true,
            urlSlug: true,
            level: true,
          },
        },
      },
    },
    brand: {
      select: {
        id: true,
        name: true,
        file: {
          select: {
            fileSecureUrl: true,
          },
        },
      },
    },
    seller: {
      select: {
        shopName: true,
        shopDescription: true,
        logo: {
          select: {
            fileSecureUrl: true,
          },
        },
      },
    },
    shippingOptions: {
      select: {
        option: {
          select: {
            name: true,
            estimateDays: true,
            charge: true,
          },
        },
      },
    },
    deliveryInfo: {
      select: {
        packageHeight: true,
        packageLength: true,
        packageWeight: true,
        packageWidth: true,
      },
    },
    tags: {
      select: {
        tag: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
  };
  return selectOptions;
};

export const getProductBaseQuery = ({ query }: TProductFilters) => {
  const whereInputs: Prisma.ProductWhereInput[] = [];

  if (query) {
    whereInputs.push({
      OR: PRODUCT_SEARCHABLE_FIELDS.map((field) => ({
        [field]: {
          contains: query,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereClause: Prisma.ProductWhereInput = whereInputs.length > 0 ? { AND: whereInputs } : {};
  return whereClause;
};
