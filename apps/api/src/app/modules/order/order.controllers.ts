import { StatusCodes } from "http-status-codes";
import { PAGINATION_KEYS } from "../../constants";
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

export const OrderControllers = {
  placeOrder,
  getAllOrdersForAdmin,
};
