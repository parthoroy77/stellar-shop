import prisma, { Prisma } from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { TUpdateProfileInput } from "./user.types";

const updateProfile = async (payload: TUpdateProfileInput, userId: number) => {
  const userExist = await prisma.user.findUnique({ where: { id: userId, status: "ACTIVE" } });

  if (!userExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found!");
  }

  const updateUserArg: Prisma.UserUpdateInput = {};
  if (payload.fullName !== userExist.fullName) {
    updateUserArg.fullName = payload.fullName;
  }

  if (payload.phoneNumber && payload.phonePrefixCode && payload.phoneNumber !== userExist.phoneNumber) {
    updateUserArg.phoneNumber = payload.phoneNumber;
    updateUserArg.phonePrefixCode = payload.phonePrefixCode;
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateUserArg,
  });
};

export const UserServices = {
  updateProfile,
};
