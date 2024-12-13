import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { uploadFileToCloudinaryAndCreateRecord } from "../../handlers/handleCloudUpload";
import logger from "../../logger";
import { deleteFromCloudinary } from "../../utils/cloudinary";
import { TOnboardingInput } from "./seller.types";

const onboarding = async (
  payload: TOnboardingInput,
  userId: number,
  filePaths: { logoPath: string; bannerPath: string }
) => {
  const { address, shopName, shopDescription, contactNumber, businessEmail } = payload;

  const uploadResults = [];

  try {
    // Upload logo and banner files and create file records
    const logoUpload = uploadFileToCloudinaryAndCreateRecord(filePaths.logoPath, "shopMedia", userId);
    const bannerUpload = uploadFileToCloudinaryAndCreateRecord(filePaths.bannerPath, "shopMedia", userId);

    // Wait for both uploads to complete
    const [logo, banner] = await Promise.all([logoUpload, bannerUpload]);
    uploadResults.push(logo.publicId, banner.publicId);

    // Perform all database operations in a transaction
    const seller = await prisma.$transaction(async (tx) => {
      await tx.address.create({
        data: address,
      });

      const result = await tx.seller.create({
        data: {
          userId,
          shopName,
          shopDescription,
          contactNumber,
          businessEmail,
          shopBannerId: banner.fileRecord.id,
          shopLogoId: logo.fileRecord.id,
        },
      });
      return result;
    });

    return seller;
  } catch (error) {
    logger.error(error);
    // Cleanup uploaded files in case of error
    await Promise.all(uploadResults.map((publicId) => deleteFromCloudinary(publicId, "shopMedia")));
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while onboarding!");
  }
};

export const SellerServices = { onboarding };
