import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { AnalyticsServices } from "./analytics.services";

const getSellerAnalytics = asyncHandler(async (req, res) => {
  const result = await AnalyticsServices.sellerAnalytics(req.user.id!);
  ApiResponse(res, {
    data: result,
    message: "Seller Dashboard analytics retrieved successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

export const AnalyticsControllers = { getSellerAnalytics };
