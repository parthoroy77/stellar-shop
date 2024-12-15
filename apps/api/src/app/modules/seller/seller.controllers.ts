import { StatusCodes } from "http-status-codes";
import { PAGINATION_KEYS } from "../../constants";
import { ApiError } from "../../handlers/ApiError";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import pick from "../../utils/pick";
import { getFilePath } from "../../utils/utils";
import { SELLER_FILTERABLE_KEYS } from "./seller.constants";
import { SellerServices } from "./seller.services";

const sellerOnboarding = asyncHandler(async (req, res) => {
  const payload = req.body;
  const logoPath = getFilePath(req, "logo");
  const bannerPath = getFilePath(req, "banner");
  if (!logoPath || !bannerPath) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Logo or banner files not found!");
  }

  if (!req.user.id) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found!");
  }

  const result = await SellerServices.onboarding({ ...payload }, req?.user?.id!, { logoPath, bannerPath });

  ApiResponse(res, {
    data: result,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Your request has been submitted, our team will review!",
  });
});

const sellerOnboardingStatus = asyncHandler(async (req, res) => {
  const userId = req?.params?.userId || req.user.id;
  if (!userId) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found!");
  }
  const result = await SellerServices.onboardingStatus(+userId);
  ApiResponse(res, {
    data: result,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Seller onboarding status fetched successfully!",
  });
});

const getAllSellers = asyncHandler(async (req, res) => {
  const filters = pick(req.query, [...SELLER_FILTERABLE_KEYS, "query"]);

  const paginateOption = pick(req.query, PAGINATION_KEYS);

  const { result, meta } = await SellerServices.getAll(filters, paginateOption);

  ApiResponse(res, {
    data: result,
    meta,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Seller onboarding status fetched successfully!",
  });
});

const sellerApproval = asyncHandler(async (req, res) => {
  const { sellerId } = req.params;

  if (!sellerId) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Seller identifier not found!");
  }

  await SellerServices.sellerApproval(+sellerId);

  ApiResponse(res, {
    data: {},
    success: true,
    statusCode: StatusCodes.OK,
    message: "Seller has been approved now!",
  });
});

export const SellerControllers = { sellerOnboarding, sellerOnboardingStatus, getAllSellers, sellerApproval };
