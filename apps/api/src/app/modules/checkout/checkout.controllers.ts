import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { CheckoutServices } from "./checkout.services";

const initializeCheckout = asyncHandler(async (req, res) => {
  const payload = req.body;

  const result = await CheckoutServices.initiateCheckout(payload, req.user.id!);

  ApiResponse(res, {
    data: result,
    success: true,
    statusCode: StatusCodes.OK,
    message: "Checkout initiated successfully!",
  });
});

export const CheckoutControllers = {
  initializeCheckout,
};
