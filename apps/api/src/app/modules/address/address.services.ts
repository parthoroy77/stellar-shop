import prisma from "@repo/prisma/client";
import { TAddressInput } from "./address.types";

const create = async (payload: TAddressInput) => {
  const result = await prisma.address.create({ data: payload });
  return result;
};

export const AddressServices = { create };
