import { IAddress, IShippingAddress } from "@repo/utils/types";

export type TAddressInput = Omit<IAddress, "id" | "createdAt" | "updatedAt">;
export type TShippingAddressInput = Omit<IShippingAddress, "id" | "createdAt" | "updatedAt">;
