import prisma from "@repo/prisma/client";
import { TProductReviewPayload } from "@repo/utils/types";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { ApiError } from "../../handlers/ApiError";
import {
  deleteFileFromCloudinaryAndRecord,
  uploadFileToCloudinaryAndCreateRecord,
} from "../../handlers/handleCloudUpload";

const create = async (
  { productId, rating, description }: TProductReviewPayload,
  userId: number,
  imagesPaths?: string[]
) => {
  const publicIds: { publicId: string; recordId: number }[] = [];

  const cleanup = async () => {
    for (const publicId of publicIds) {
      await deleteFileFromCloudinaryAndRecord(publicId.publicId, publicId.recordId);
    }
  };

  // For development purpose skip this process
  // TODO: Remove this check when final launch of product
  if (config.NODE_ENV === "production") {
    const isAlreadyReviewAdded = await prisma.productReview.findFirst({
      where: { userId, productId: +productId },
      select: { id: true },
    });

    if (isAlreadyReviewAdded) {
      throw new ApiError(StatusCodes.CONFLICT, "You already added review for this product!");
    }
  }

  try {
    let reviewImages;
    if (imagesPaths && imagesPaths.length > 0) {
      // Upload file to cloudinary and create file record
      reviewImages = await Promise.all(
        imagesPaths.map((path) => uploadFileToCloudinaryAndCreateRecord(path, "product-review", userId))
      );
      // Store public ids to clear images if any error occurs
      publicIds.push(
        ...reviewImages.map((img) => ({ publicId: img.fileRecord.filePublicId, recordId: img.fileRecord.id }))
      );
    }

    // Create entry of file record
    await prisma.productReview.create({
      data: {
        productId: +productId,
        rating: +rating,
        description,
        userId,
        images:
          reviewImages && reviewImages.length > 0
            ? { createMany: { data: reviewImages.map((img) => ({ fileId: img.fileRecord.id })) } }
            : {},
      },
    });
  } catch (error) {
    if (publicIds.length > 0) {
      await cleanup();
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while adding review!");
  }
};

const getAllByUser = async (userId: number) => {
  const result = await prisma.productReview.findMany({
    where: {
      userId,
    },
    select: {
      rating: true,
      description: true,
      images: {
        select: {
          file: { select: { fileSecureUrl: true } },
        },
      },
      product: {
        select: {
          productName: true,
          images: { take: 1, select: { file: { select: { fileSecureUrl: true } } } },
        },
      },
    },
  });
  return result;
};

export const ProductReviewServices = {
  create,
  getAllByUser,
};
