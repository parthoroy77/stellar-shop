import { Prisma, ProductStatus } from "@repo/prisma/client";
import pick from "../../utils/pick";
import { PRODUCT_FILTERABLE_KEYS, PRODUCT_SEARCHABLE_FIELDS } from "./product.constants";
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

export const getProductsBaseSelectOption = (): Prisma.ProductSelect => {
  return {
    id: true,
    stock: true,
    price: true,
    comparePrice: true,
    productName: true,
    urlSlug: true,
    images: {
      take: 1,
      select: {
        file: { select: { fileUrl: true, fileSecureUrl: true } },
      },
    },
  };
};

export const parseProductFilters = (query: Record<string, any>): TProductFilters => {
  const filters = pick(query, PRODUCT_FILTERABLE_KEYS) as TProductFilters;

  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === "string") {
      if (key === "brands" || key === "tags") {
        filters[key] = value.split(",").map((v) => v.trim());
      } else if (key === "inStock") {
        filters[key] = value === "true";
      } else if (key === "max" || key === "min") {
        filters[key] = Number(value);
      }
    }
  });

  return filters;
};

/**
 * Prepare a Prisma query object based on the provided product filter criteria.
 *
 * @param {TProductFilters} filters - Object containing search filters such as query, brands, price range, tags, and stock availability.
 * @returns {Prisma.ProductWhereInput} - A Prisma `where` clause dynamically built from the filter criteria.
 */
export const getProductBaseQuery = ({
  query,
  brands,
  min,
  max,
  tags,
  inStock,
  status,
}: TProductFilters): Prisma.ProductWhereInput => {
  const whereConditions: Prisma.ProductWhereInput[] = [];

  // Full-text search across product filterable fields fields
  if (query) {
    whereConditions.push({
      OR: PRODUCT_SEARCHABLE_FIELDS.map((field) => ({
        [field]: {
          contains: query,
          mode: "insensitive",
        },
      })),
    });
  }

  // Filter by brand
  if (brands?.length) {
    whereConditions.push({
      OR: brands.map((brand) => ({
        brand: {
          name: {
            contains: brand,
            mode: "insensitive",
          },
        },
      })),
    });
  }

  // Filter by minimum price
  if (min) {
    whereConditions.push({
      AND: {
        price: {
          gte: +min,
        },
      },
    });
  }

  // Filter by maximum price
  if (max !== undefined) {
    whereConditions.push({
      AND: {
        price: {
          lte: +max,
        },
      },
    });
  }

  // Filter by associated tags
  if (tags?.length) {
    whereConditions.push({
      OR: tags.map((tag) => ({
        tags: {
          some: {
            tag: {
              name: {
                contains: tag,
                mode: "insensitive",
              },
            },
          },
        },
      })),
    });
  }

  // Filter by stock availability
  if (inStock !== undefined) {
    whereConditions.push({
      AND: {
        stock: inStock ? { gt: 0 } : { lt: 1 },
      },
    });
  }

  // Filter by status
  if (status) {
    whereConditions.push({
      AND: {
        status: status.toUpperCase() as ProductStatus,
      },
    });
  }

  return whereConditions.length > 0 ? { AND: whereConditions } : {};
};
