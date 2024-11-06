import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { handleCloudinaryUpload } from "../../handlers/handleCloudUpload";
import logger from "../../logger";
import { TPaginateOption } from "../../utils/calculatePagination";
import { deleteFromCloudinary } from "../../utils/cloudinary";
import { generateUniqueSlug } from "../../utils/generateUniqueSlug";
import { TCategoryFilters, TCategoryInput } from "./category.types";
import { CATEGORY_IMAGE_INCLUDE, getCategoryBaseQuery } from "./category.utils";

// create category
const create = async (payload: TCategoryInput, filePath: string, userId: number) => {
  const slug = await generateUniqueSlug(payload.categoryName, prisma.category, "urlSlug");

  const uploadedFile = await handleCloudinaryUpload(filePath, "categoryImages");

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

// get all categories with all possible filters
const getAll = async (filters: TCategoryFilters, options: TPaginateOption) => {
  const { finalWhereClause, limit, skip, sortBy, sortOrder, page } = getCategoryBaseQuery(filters, options);
  const [result, total] = await prisma.$transaction([
    prisma.category.findMany({
      where: finalWhereClause,
      include: {
        images: {
          include: {
            file: true,
          },
        },
      },
      take: limit,
      skip,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),

    prisma.category.count({ where: finalWhereClause }),
  ]);

  return {
    result,
    meta: {
      limit,
      skip,
      total,
      page,
      sortBy,
      sortOrder,
    },
  };
};

// get all categories with all children
const getAllWithChildren = async () => {
  const result = await prisma.category.findMany({
    where: {
      level: "COLLECTION",
      status: "ACTIVE",
    },
    include: {
      ...CATEGORY_IMAGE_INCLUDE,
      subCategories: {
        where: {
          status: "ACTIVE",
        },
        include: {
          ...CATEGORY_IMAGE_INCLUDE,
          subCategories: {
            where: {
              status: "ACTIVE",
            },
            include: {
              ...CATEGORY_IMAGE_INCLUDE,
            },
          },
        },
      },
    },
  });
  return result;
};

// get all selected parent categories with search criteria
const getAllParentCategories = async (filters: TCategoryFilters) => {
  const { finalWhereClause } = getCategoryBaseQuery(filters, {});
  const result = await prisma.category.findMany({
    where: {
      ...finalWhereClause,
      status: "ACTIVE",
    },
    include: {
      ...CATEGORY_IMAGE_INCLUDE,
    },
  });

  return result;
};

const deleteACategory = async (categoryId: number) => {
  // Find the category file with the related file information
  const categoryFile = await prisma.categoryFile.findFirst({
    where: { categoryId },
    include: { file: true },
  });

  // If there's no category or file association, return early
  if (!categoryFile) return;

  // Perform all deletions in a single transaction
  await prisma.$transaction(async (tx) => {
    if (categoryFile.fileId) {
      await tx.categoryFile.delete({ where: { id: categoryFile.id } });
      await tx.file.delete({ where: { id: categoryFile.fileId } });
      await tx.category.delete({ where: { id: categoryId } });
    }
  });

  // Delete file from Cloudinary if it exists
  if (categoryFile.file?.filePublicId) {
    await deleteFromCloudinary(categoryFile.file.filePublicId);
  }

  return;
};

export const CategoryServices = {
  create,
  getAll,
  getAllWithChildren,
  getAllParentCategories,
  deleteACategory,
};
