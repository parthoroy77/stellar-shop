import { IAddress } from "@repo/utils/types";

export type TAddressInput = Omit<IAddress, "id" | "createdAt" | "updatedAt" | "userId">;
