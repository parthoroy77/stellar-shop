import { StatusCodes } from "http-status-codes";
import { PAGINATION_KEYS } from "../../constants";
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

export const SubOrderControllers = {
  getSellerAllOrders,
};
