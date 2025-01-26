import prisma, { Prisma } from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { uploadFileToCloudinaryAndCreateRecord } from "../../handlers/handleCloudUpload";
import { deleteFromCloudinary } from "../../utils/cloudinary";
import { TUpdateProfileInput } from "./user.types";

const updateProfile = async ({ fullName, phoneNumber, phonePrefixCode }: TUpdateProfileInput, userId: number) => {
  const userExist = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      status: true,
      fullName: true,
      phoneNumber: true,
      phonePrefixCode: true,
    },
  });

  if (!userExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found!");
  }

  const updateUserArg: Prisma.UserUpdateInput = {};

  if (fullName !== userExist.fullName) {
    updateUserArg.fullName = fullName;
  }

  if (
    phoneNumber &&
    phonePrefixCode &&
    (phoneNumber !== userExist.phoneNumber || phonePrefixCode !== userExist.phonePrefixCode)
  ) {
    if (phoneNumber && !/^[0-9]{7,20}$/.test(phoneNumber)) {
      return {
        message: "Invalid phone number format.",
        statusCode: StatusCodes.NOT_ACCEPTABLE,
      };
    }

    updateUserArg.phoneNumber = phoneNumber;
    updateUserArg.phonePrefixCode = phonePrefixCode;
  }

  // Check if there is anything to update
  if (Object.keys(updateUserArg).length === 0) {
    return { message: "No changes to update", statusCode: StatusCodes.OK };
  }

  // Update the user record
  await prisma.user.update({
    where: { id: userId },
    data: {
      ...(fullName && { fullName }),
      ...(phoneNumber && { phoneNumber }),
      ...(phonePrefixCode && { fullName }),
    },
  });
  return { message: "Profile updated successfully", statusCode: StatusCodes.OK };
};

/**
 * Updates the user's avatar by uploading a new file, deleting the old one,
 * and updating the user's avatar details in the database.
 *
 * @param userId - The ID of the authenticated user.
 * @param filePath - The path of the new avatar file to upload.
 */
export const updateAvatar = async (userId: number, filePath: string) => {
  // Fetch the user's current avatar details
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { avatarId: true, avatar: true },
  });

  // Upload the new avatar file and create a record in the File model
  const uploadedAvatar = await uploadFileToCloudinaryAndCreateRecord(filePath, "avatars", userId);

  try {
    await prisma.$transaction(async (tx) => {
      // If the user already has an avatar, delete the old one
      if (user?.avatarId && user?.avatar) {
        await deleteFromCloudinary(user.avatar.filePublicId, "image");
        await tx.file.delete({ where: { id: user.avatar.id } });
      }

      // Update the user's avatar details in the database
      await tx.user.update({
        where: { id: userId },
        data: {
          avatarId: uploadedAvatar.fileRecord.id,
          avatarUrl: uploadedAvatar.fileRecord.fileSecureUrl,
        },
      });
    });
  } catch (error) {
    // Rollback: Delete the newly uploaded file from Cloudinary
    await deleteFromCloudinary(uploadedAvatar.fileRecord.filePublicId, "image");
    await prisma.file.delete({ where: { id: uploadedAvatar.fileRecord.id } });

    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to update photo!");
  }
};

/**
 * Deletes the user's avatar photo and clears the avatar reference from the database.
 *
 * @param userId - The ID of the authenticated user.
 */
const deleteAvatar = async (userId: number) => {
  // Fetch the user's current avatar details
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { avatarId: true, avatar: true },
  });

  if (!user || !user.avatarId || !user.avatar) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "No avatar to delete!");
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Delete the file from Cloudinary
      await deleteFromCloudinary(user.avatar!.filePublicId, "image");

      // Delete the file record in the database
      await tx.file.delete({ where: { id: user.avatar!.id } });

      // Clear the avatar reference in the user record
      await tx.user.update({
        where: { id: userId },
        data: { avatarId: null, avatarUrl: null },
      });
    });
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to delete photo!");
  }
};

export const UserServices = {
  updateProfile,
  updateAvatar,
  deleteAvatar,
};
