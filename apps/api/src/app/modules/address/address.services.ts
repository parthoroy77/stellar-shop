import prisma from "@repo/prisma/client";
import { TAddressInput } from "./address.types";

const create = async (payload: TAddressInput, userId: number) => {
  const result = await prisma.address.create({ data: { ...payload, userId } });
  return result;
};

export const AddressServices = { create };
