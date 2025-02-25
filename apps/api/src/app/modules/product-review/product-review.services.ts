import prisma from "@repo/prisma/client";
import { TProductReviewPayload } from "@repo/utils/types";
import { StatusCodes } from "http-status-codes";
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

  try {
    let reviewImages;
    if (imagesPaths?.length) {
      // Upload file to cloudinary and create file record
      reviewImages = await Promise.all(
        imagesPaths?.map((path) => uploadFileToCloudinaryAndCreateRecord(path, "product-review", userId))
      );
      // Store public ids to clear images if any error occurs
      publicIds.push(
        ...reviewImages.map((img) => ({ publicId: img.fileRecord.filePublicId, recordId: img.fileRecord.id }))
      );
    }

    // Create entry of file record
    await prisma.productReview.create({
      data: {
        productId,
        rating,
        description,
        userId,
        images:
          reviewImages && reviewImages?.length > 0
            ? { createMany: { data: reviewImages.map((img) => ({ fileId: img.fileRecord.id })) } }
            : {},
      },
    });
  } catch (error) {
    if (publicIds.length) {
      cleanup();
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while adding review!");
  }
};

export const ProductReviewServices = {
  create,
};
