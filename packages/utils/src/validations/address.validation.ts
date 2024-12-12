import z from "zod";

export const addressValidationSchema = z.object({
  fullAddress: z.string(),
  country: z.string(),
  city: z.string(),
  zipCode: z.string(),
  state: z.string(),
  isPrimary: z.boolean(),
  type: z.enum(["HOME", "WORK", "BUSINESS"]),
});

export type TAddressValidation = z.infer<typeof addressValidationSchema>;
