import { StatusCodes } from "http-status-codes";
import { PAGINATION_KEYS } from "../../constants";
import { ApiError } from "../../handlers/ApiError";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import pick from "../../utils/pick";
import { ORDER_FILTERABLE_KEYS } from "./order.constants";
import { OrderServices } from "./order.services";
import { TOrderFilters } from "./order.types";

const placeOrder = asyncHandler(async (req, res) => {
  const payload = req.body;
  const { statusCode, message, redirectUrl } = await OrderServices.place(payload, req.user.id!);
  ApiResponse(res, {
    data: { redirectUrl },
    statusCode,
    success: true,
    message,
  });
});

const getAllOrdersForAdmin = asyncHandler(async (req, res) => {
  const filters = pick(req.query, ORDER_FILTERABLE_KEYS) as TOrderFilters;
  const options = pick(req.query, PAGINATION_KEYS);

  const { result, meta } = await OrderServices.getOrdersForAdmin(filters, options);

  ApiResponse(res, {
    data: result,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders retrieved successfully!",
    meta,
  });
});

const updateOrderStatusForAdmin = asyncHandler(async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  if (!id) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Order identifier not found!");
  }
  const { statusCode, message } = await OrderServices.updateOrderStatusForAdmin(+id, payload.status);
  ApiResponse(res, {
    data: {},
    statusCode,
    message,
    success: true,
  });
});

const getOrderDetailsForAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Order identifier not found!");
  }

  const result = await OrderServices.getDetailForAdmin(+id);

  ApiResponse(res, {
    data: result,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order detail retrieved successfully!",
  });
});

const getAllBuyerOrders = asyncHandler(async (req, res) => {
  const filters = pick(req.query, ORDER_FILTERABLE_KEYS) as TOrderFilters;
  const options = pick(req.query, PAGINATION_KEYS);

  const { result, meta } = await OrderServices.getOrdersForBuyer(req.user.id!, options, filters.status || undefined);

  ApiResponse(res, {
    data: result,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders retrieved successfully!",
    meta,
  });
});

const getOrderDetailsForBuyer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Order identifier not found!");
  }

  const result = await OrderServices.getDetailForBuyer(+id, req.user.id!);

  ApiResponse(res, {
    data: result,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order detail retrieved successfully!",
  });
});

export const OrderControllers = {
  placeOrder,
  getAllOrdersForAdmin,
  updateOrderStatusForAdmin,
  getOrderDetailsForAdmin,
  getAllBuyerOrders,
  getOrderDetailsForBuyer,
};
