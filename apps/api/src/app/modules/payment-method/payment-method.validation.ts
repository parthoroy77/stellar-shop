import { z } from "@repo/utils/validations";

export const addPaymentMethodValidationSchema = z.object({
  name: z.string(),
  providerId: z.string().or(z.number()),
  description: z.string().optional(),
});

export const addPaymentProviderValidationSchema = z.object({
  name: z.string(),
  meta: z.object({}).optional(),
});
