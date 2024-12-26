import z from "zod";

export const createShippingOptionValidationSchema = z.object({
  name: z.string(),
  estimateDays: z.string(),
  charge: z.number(),
});
