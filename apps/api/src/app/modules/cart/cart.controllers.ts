import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { CartServices } from "./cart.services";

const manageAddProductToCart = asyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await CartServices.addToCart({ ...payload, userId: req.user.id });
  ApiResponse(res, {
    data: {},
    message: result.message,
    success: true,
    statusCode: result.status,
  });
});

export const CartControllers = {
  manageAddProductToCart,
};
