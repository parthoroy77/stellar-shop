import prisma, { Prisma, SellerStatus } from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { uploadFileToCloudinaryAndCreateRecord } from "../../handlers/handleCloudUpload";
import logger from "../../logger";
import calculatePagination, { TPaginateOption } from "../../utils/calculatePagination";
import { deleteFromCloudinary } from "../../utils/cloudinary";
import { SELLER_SEARCHABLE_KEYS } from "./seller.constants";
import { TOnboardingInput, TSellerFilters } from "./seller.types";

const onboarding = async (
  payload: TOnboardingInput,
  userId: number,
  filePaths: { logoPath: string; bannerPath: string }
) => {
  const { country, city, state, zipCode, fullAddress, type, shopName, shopDescription, contactNumber, businessEmail } =
    payload;

  const uploadResults = [];

  try {
    // check is shop already created by this user.
    const isExist = await prisma.seller.findUnique({ where: { userId } });
    if (isExist) {
      throw new ApiError(StatusCodes.CONFLICT, "You already completed your onboarding!");
    }
    // Upload logo and banner files and create file records
    const logoUpload = uploadFileToCloudinaryAndCreateRecord(filePaths.logoPath, "shopMedia", userId);
    const bannerUpload = uploadFileToCloudinaryAndCreateRecord(filePaths.bannerPath, "shopMedia", userId);

    // Wait for both uploads to complete
    const [logo, banner] = await Promise.all([logoUpload, bannerUpload]);
    uploadResults.push(logo.publicId, banner.publicId);

    // Perform all database operations in a transaction
    const seller = await prisma.$transaction(async (tx) => {
      await tx.address.create({
        data: { country, state, city, zipCode, fullAddress, isPrimary: true, type, userId },
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
    await Promise.all(uploadResults.map((publicId) => deleteFromCloudinary(publicId, "image")));
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while onboarding!");
  }
};

const onboardingStatus = async (userId: number) => {
  const result = await prisma.seller.findUnique({ where: { userId } });
  return { approved: result?.status === "ACTIVE" || false, submitted: result ? true : false };
};

const getAll = async (filters: TSellerFilters, options: TPaginateOption) => {
  const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
  const { query, status } = filters;

  const andClauses: Prisma.SellerWhereInput[] = [];

  if (query) {
    andClauses.push({
      OR: SELLER_SEARCHABLE_KEYS.map((key) => ({
        [key]: {
          contains: query,
          mode: "insensitive",
        },
      })),
    });
  }

  if (status) {
    andClauses.push({
      AND: {
        status: {
          equals: status.toUpperCase() as SellerStatus,
        },
      },
    });
  }

  const finalWhereClause: Prisma.SellerWhereInput = andClauses.length > 0 ? { AND: andClauses } : {};
  const [result, total] = await prisma.$transaction([
    prisma.seller.findMany({
      where: finalWhereClause,
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
            addresses: {
              select: {
                country: true,
              },
            },
          },
        },
        logo: { select: { fileName: true, fileSecureUrl: true, fileUrl: true } },
      },
      take: limit,
      skip,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prisma.seller.count({ where: finalWhereClause }),
  ]);

  return {
    result,
    meta: { limit, page, total, skip, sortBy, sortOrder },
  };
};

export const SellerServices = { onboarding, onboardingStatus, getAll };