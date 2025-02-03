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
