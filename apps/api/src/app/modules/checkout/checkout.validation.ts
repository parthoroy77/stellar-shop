import { z } from "@repo/utils/validations";

export const checkoutInitiateValidationSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("cart"),
    cartItemIds: z.array(z.string()),
  }),
  z.object({
    type: z.literal("product"),
    productId: z.string(),
    quantity: z.string(),
    productVariantId: z.string().optional(),
  }),
]);
