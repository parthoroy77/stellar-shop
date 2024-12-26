import z from "zod";

export const attributeValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  values: z.array(z.string()),
});
