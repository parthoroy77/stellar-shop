import z from "zod";

export const attributeValidationSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  values: z.array(z.string()).min(1, "At least one value is required"),
});

export const bulkAttributeValidationSchema = z
  .array(attributeValidationSchema)
  .min(1, "At least one attribute is required");

export type TAttributeValidationSchema = z.infer<typeof attributeValidationSchema>;
export type TBulkAttributeValidationSchema = z.infer<typeof bulkAttributeValidationSchema>;
