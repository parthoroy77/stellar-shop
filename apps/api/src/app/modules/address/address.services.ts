import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
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

const updateAddress = async (id: number, payload: Partial<TAddressInput>) => {
  const existingAddress = await prisma.address.findUnique({ where: { id } });

  if (!existingAddress) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Address not found");
  }

  if (payload.isPrimary) {
    await prisma.$transaction([
      prisma.address.updateMany({
        where: { userId: existingAddress.userId },
        data: { isPrimary: false },
      }),
      prisma.address.update({
        where: { id },
        data: { ...payload, isPrimary: true },
      }),
    ]);
  } else {
    await prisma.address.update({
      where: { id },
      data: { ...payload },
    });
  }

  return;
};

const deleteAddress = async (id: number) => {
  const existingAddress = await prisma.address.findUnique({ where: { id } });

  if (!existingAddress) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Address not found");
  }

  await prisma.address.delete({ where: { id } });

  return;
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

const updateShippingAddress = async (id: number, payload: Partial<TShippingAddressInput>) => {
  const existingShippingAddress = await prisma.shippingAddress.findUnique({ where: { id } });

  if (!existingShippingAddress) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Shipping address not found");
  }

  if (payload.isPrimary) {
    await prisma.$transaction([
      prisma.shippingAddress.updateMany({
        where: { userId: existingShippingAddress.userId },
        data: { isPrimary: false },
      }),
      prisma.shippingAddress.update({
        where: { id },
        data: { ...payload, isPrimary: true },
      }),
    ]);
  } else {
    await prisma.shippingAddress.update({
      where: { id },
      data: { ...payload },
    });
  }

  return;
};

const deleteShippingAddress = async (id: number) => {
  const existingShippingAddress = await prisma.shippingAddress.findUnique({ where: { id } });

  if (!existingShippingAddress) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Shipping address not found");
  }

  await prisma.shippingAddress.delete({ where: { id } });

  return;
};

export const AddressServices = {
  createAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
  createShippingAddress,
  getAllShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
