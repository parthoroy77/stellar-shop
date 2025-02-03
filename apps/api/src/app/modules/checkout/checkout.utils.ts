import { Prisma } from "@repo/prisma/client";

export const initialCheckoutProductSelectArgs = (
  variantWhere: Prisma.ProductVariantWhereInput
): Prisma.ProductSelect => {
  return {
    id: true,
    stock: true,
    productName: true,
    price: true,
    sellerId: true,
    images: {
      take: 1,
      select: { file: { select: { fileSecureUrl: true } } },
    },
    shippingOptions: {
      select: {
        option: {
          select: {
            id: true,
            name: true,
            estimateDays: true,
            charge: true,
          },
        },
      },
    },
    seller: {
      select: {
        shopName: true,
        logo: {
          select: {
            fileSecureUrl: true,
          },
        },
      },
    },
    variants: {
      where: variantWhere,
      select: {
        id: true,
        isDefault: true,
        price: true,
        stock: true,
      },
    },
  };
};
