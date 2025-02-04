import { z } from "@repo/utils/validations";

export const checkoutInitiateValidationSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("cart"),
    cartItemIds: z.array(z.string().or(z.number())),
  }),
  z.object({
    type: z.literal("product"),
    productId: z.string().or(z.number()),
    quantity: z.string().or(z.number()),
    productVariantId: z.string().or(z.number()).optional(),
  }),
]);

export const checkoutUpdateValidationSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("shippingAddressUpdate"),
    shippingAddressId: z.string().or(z.number()),
  }),
  z.object({
    type: z.literal("paymentMethodUpdate"),
    paymentMethodId: z.string().or(z.number()),
  }),
  z.object({
    type: z.literal("shippingOptionUpdate"),
    shippingOption: z.object({
      sellerId: z.string().or(z.number()),
      shippingOptionId: z.string().or(z.number()),
    }),
  }),
  // z.object({
  //   type: z.literal("productDelete"),
  //   product: z.object({
  //     sellerId: z.string().or(z.number()),
  //     productId: z.string().or(z.number()),
  //   }),
  // }),
]);
