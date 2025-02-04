import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { OrderServices } from "./order.services";

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

export const OrderControllers = {
  placeOrder,
};
