import prisma from "@repo/prisma/client";
import { TAddressInput, TShippingAddressInput } from "./address.types";

const createAddress = async (payload: TAddressInput) => {
  if (payload.isPrimary) {
    await prisma.$transaction([
      prisma.address.updateMany({ where: { userId: payload.userId }, data: { isPrimary: false } }),
      prisma.address.create({ data: { ...payload } }),
    ]);
  } else {
    const result = await prisma.address.create({ data: { ...payload } });
    return result;
  }
};

const createShippingAddress = async (payload: TShippingAddressInput) => {
  if (payload.isPrimary) {
    await prisma.$transaction([
      prisma.shippingAddress.updateMany({ where: { userId: payload.userId }, data: { isPrimary: false } }),
      prisma.shippingAddress.create({ data: { ...payload } }),
    ]);
  } else {
    const result = await prisma.shippingAddress.create({ data: { ...payload } });
    return result;
  }
};

const getAllAddress = async (userId: number) => {
  const result = await prisma.address.findMany({
    where: { userId },
    select: {
      id: true,
      userId: true,
      fullAddress: true,
      country: true,
      state: true,
      city: true,
      type: true,
      isPrimary: true,
    },
  });
  return result;
};

const getAllShippingAddress = async (userId: number) => {
  const result = await prisma.shippingAddress.findMany({
    where: { userId },
    select: {
      id: true,
      userId: true,
      fullName: true,
      phoneNumber: true,
      fullAddress: true,
      country: true,
      state: true,
      city: true,
      type: true,
      isPrimary: true,
    },
  });
  return result;
};

export const AddressServices = { createAddress, createShippingAddress, getAllAddress, getAllShippingAddress };
