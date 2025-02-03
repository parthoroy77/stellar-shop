import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { CheckoutServices } from "./checkout.services";
import { TCheckoutInitiatePayload } from "./checkout.types";

const initializeCheckout = asyncHandler(async (req, res) => {
  const body = req.body;
  // prepare payload
  const payload: TCheckoutInitiatePayload = body.cartItemIds
    ? { cartItemIds: (body.cartItemIds as (string | number)[]).map(Number) }
    : {
        checkoutProduct: {
          productId: +body.productId,
          productVariantId: +body.productVariantId || null,
          quantity: +body.quantity,
        },
      };

  await CheckoutServices.initiateCheckout(payload, req.user.id!);

  ApiResponse(res, {
    data: {},
    success: true,
    statusCode: StatusCodes.OK,
    message: "Checkout initiated successfully!",
  });
});

const getUserCheckoutSession = asyncHandler(async (req, res) => {
  const result = await CheckoutServices.getSession(req.user.id!);

  ApiResponse(res, {
    data: result,
    statusCode: StatusCodes.OK,
    message: "Checkout session fetched successfully!",
    success: true,
  });
});

export const CheckoutControllers = {
  initializeCheckout,
  getUserCheckoutSession,
};
