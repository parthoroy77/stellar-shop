import { ShippingOption } from "@repo/prisma/client";

export type TShippingOptionInput = Omit<ShippingOption, "id" | "createdAt" | "status" | "updatedAt">;

export type TShippingOptionFilters = { name?: string; status?: string; query?: string };
