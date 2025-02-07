import { StatusCodes } from "http-status-codes";
import { PAGINATION_KEYS } from "../../constants";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import pick from "../../utils/pick";
import { SELLER_ORDER_FILTERABLE_KEYS } from "./order.constants";
import { OrderServices } from "./order.services";
import { TSellerOrderFilters } from "./order.types";

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

const getSellerAllOrders = asyncHandler(async (req, res) => {
  const options = pick(req.query, [...PAGINATION_KEYS]);
  const filters = pick(req.query, SELLER_ORDER_FILTERABLE_KEYS) as TSellerOrderFilters;
  const { result, meta } = await OrderServices.getSellerOrders(filters, options, req.user.id!);
  ApiResponse(res, {
    data: result,
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders retrieved successfully!",
    meta,
  });
});

export const OrderControllers = {
  placeOrder,
  getSellerAllOrders,
};
