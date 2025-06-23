import prisma, { Prisma, SellerStatus } from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import {
  deleteFileFromCloudinaryAndRecord,
  uploadFileToCloudinaryAndCreateRecord,
} from "../../handlers/handleCloudUpload";
import logger from "../../logger";
import calculatePagination, { TPaginateOption } from "../../utils/calculatePagination";
import { SELLER_SEARCHABLE_KEYS } from "./seller.constants";
import { TOnboardingInput, TSellerFilters } from "./seller.types";

// seller onboarding
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
    uploadResults.push(logo.fileRecord.filePublicId, banner.fileRecord.filePublicId);

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
    await Promise.all(uploadResults.map((publicId) => deleteFileFromCloudinaryAndRecord(publicId)));
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while onboarding!");
  }
};

// seller onboarding status checking
const onboardingStatus = async (userId: number) => {
  const result = await prisma.seller.findUnique({ where: { userId } });
  return { approved: result?.status === "ACTIVE" || false, submitted: result ? true : false };
};

// get all sellers list including user, address, logo data with filters and pagination
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

// FOR ADMIN: approve seller profile and shop to continue selling
const sellerApproval = async (sellerId: number) => {
  const sellerProfile = await prisma.seller.findFirst({
    where: { id: sellerId, status: "INACTIVE" },
    include: { user: { select: { status: true } } },
  });

  if (!sellerProfile) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Seller not found or already approved!");
  }

  if (sellerProfile?.user.status !== "ACTIVE") {
    throw new ApiError(StatusCodes.CONFLICT, "This seller associate user restricted or inactive!");
  }

  await prisma.seller.update({
    where: { id: sellerId },
    data: { status: "ACTIVE" },
  });

  // TODO: Send an welcome mail and mention their profile now approved can post products

  return;
};

const getByUserId = async (userId: number) => {
  const result = await prisma.seller.findUnique({
    where: {
      userId,
    },
    include: {
      logo: {
        select: { fileSecureUrl: true },
      },

      banner: {
        select: { fileSecureUrl: true },
      },
    },
  });
  return result;
};

export const SellerServices = { onboarding, onboardingStatus, getAll, sellerApproval, getByUserId };
