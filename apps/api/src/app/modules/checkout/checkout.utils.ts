import { Prisma } from "@repo/prisma/client";

export const initialCheckoutProductSelectArgs = (
  variantWhere: Prisma.ProductVariantWhereInput
): Prisma.ProductSelect => {
  return {
    id: true,
    stock: true,
    price: true,
    sellerId: true,
    shippingOptions: {
      select: {
        option: {
          select: {
            id: true,
          },
        },
      },
    },
    variants: {
      where: variantWhere,
      select: {
        id: true,
      },
    },
  };
};
