import { TCheckoutInitiatePayload, TCheckoutUpdatePayload } from "@repo/utils/types";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { CheckoutServices } from "./checkout.services";

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

const updateCheckoutSession = asyncHandler(async (req, res) => {
  const { type, shippingAddressId, paymentMethodId, shippingOption } = req.body as TCheckoutUpdatePayload;

  const payload: TCheckoutUpdatePayload = {
    type,
    ...(type === "shippingAddressUpdate" && { shippingAddressId }),
    ...(type === "paymentMethodUpdate" && { paymentMethodId }),
    ...(type === "shippingOptionUpdate" && {
      shippingOption: {
        sellerId: +shippingOption!.sellerId,
        shippingOptionId: +shippingOption!.shippingOptionId,
      },
    }),
  };

  const { message, statusCode } = await CheckoutServices.update(payload, req.user.id!);

  ApiResponse(res, {
    data: {},
    message,
    statusCode,
    success: true,
  });
});

const getCheckoutSummary = asyncHandler(async (req, res) => {
  const result = await CheckoutServices.summary(req.user.id!);

  ApiResponse(res, {
    data: result,
    message: "Checkout summary fetched successfully",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

export const CheckoutControllers = {
  initializeCheckout,
  getUserCheckoutSession,
  updateCheckoutSession,
  getCheckoutSummary,
};
