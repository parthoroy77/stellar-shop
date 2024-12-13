import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import logger from "../logger";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { ApiError } from "./ApiError";

export const handleCloudinaryUpload = async (filePath: string, folderName: string) => {
  const uploadedFile = await uploadOnCloudinary(filePath, folderName);
  if (!uploadedFile) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while doing server upload!");
  }
  return uploadedFile;
};

export const uploadFileToCloudinaryAndCreateRecord = async (filePath: string, folder: string, userId: number) => {
  try {
    const uploadResult = await handleCloudinaryUpload(filePath, folder);
    const fileRecord = await prisma.file.create({
      data: {
        fileName: uploadResult.original_filename,
        filePublicId: uploadResult.public_id,
        fileSecureUrl: uploadResult.secure_url,
        fileSize: uploadResult.bytes,
        fileType: "IMAGE",
        fileUrl: uploadResult.url,
        uploadedBy: userId,
      },
    });
    return { fileRecord, publicId: uploadResult.public_id };
  } catch (error) {
    logger.error(`Error uploading file to Cloudinary or creating file record: ${error}`);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "File upload failed.");
  }
};
