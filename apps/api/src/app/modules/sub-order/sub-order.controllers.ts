import { StatusCodes } from "http-status-codes";
import { PAGINATION_KEYS } from "../../constants";
import { ApiError } from "../../handlers/ApiError";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import pick from "../../utils/pick";
import { SELLER_ORDER_FILTERABLE_KEYS } from "./sub-order.constants";
import { SubOrderServices } from "./sub-order.services";
import { TSellerOrderFilters } from "./sub-order.types";

const getSellerAllOrders = asyncHandler(async (req, res) => {
  const options = pick(req.query, [...PAGINATION_KEYS]);
  const filters = pick(req.query, SELLER_ORDER_FILTERABLE_KEYS) as TSellerOrderFilters;
  const { result, meta } = await SubOrderServices.getAll(filters, options, req.user.id!);
  ApiResponse(res, {
    data: result,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders retrieved successfully!",
    meta,
  });
});

const updateSubOrderStatus = asyncHandler(async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  if (!id) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Order identifier not found!");
  }
  const { statusCode, message } = await SubOrderServices.updateStatus(+id, payload.status, req.user.id!);
  ApiResponse(res, {
    data: {},
    statusCode,
    message,
    success: true,
  });
});

const getSellerOrderDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await SubOrderServices.get(+id!);
  ApiResponse(res, {
    data: result,
    success: true,
    message: "Order details retrieved successfully!",
    statusCode: StatusCodes.OK,
  });
});

export const SubOrderControllers = {
  getSellerAllOrders,
  updateSubOrderStatus,
  getSellerOrderDetails,
};
