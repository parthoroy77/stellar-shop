import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { deleteFromCloudinary, uploadOnCloudinary } from "../../utils/cloudinary";
import { generateUniqueSlug } from "../../utils/generateUniqueSlug";
import { TCategoryInput } from "./category.types";
import logger from "../../logger";

const create = async (payload: TCategoryInput, filePath: string, userId: number) => {
  const slug = await generateUniqueSlug(payload.categoryName, prisma.category, "urlSlug");

  const uploadedFile = await uploadOnCloudinary(filePath, "categoryImages");

  if (!uploadedFile) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while doing server upload!");
  }

  try {
    const result = await prisma.category.create({
      data: {
        description: payload.description,
        urlSlug: slug,
        categoryName: payload.categoryName,
        level: payload.level,
        parentCategoryId: Number(payload.parentId) ?? undefined,
        images: {
          create: {
            file: {
              create: {
                fileName: uploadedFile.original_filename,
                filePublicId: uploadedFile.public_id,
                fileSecureUrl: uploadedFile.secure_url,
                fileSize: uploadedFile.bytes,
                fileType: "IMAGE",
                fileUrl: uploadedFile.url,
                uploadedBy: Number(userId),
              },
            },
          },
        },
      },
    });
    return result;
  } catch (error) {
    logger.error(error);
    await deleteFromCloudinary(uploadedFile.public_id, "image");
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while serving request!");
  }
};

export const CategoryServices = {
  create,
};
