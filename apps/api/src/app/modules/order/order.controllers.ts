import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { OrderServices } from "./order.services";

const placeOrder = asyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await OrderServices.place(payload, req.user.id!);
  ApiResponse(res, {
    data: result,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Order placed successfully",
  });
});

export const OrderControllers = {
  placeOrder,
};
