import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { PaymentServices } from "./payment.services";

const initiatePayment = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Order Id not found");
  }

  const { redirectUrl } = await PaymentServices.initiate(orderId);

  ApiResponse(res, {
    data: { redirectUrl },
    statusCode: StatusCodes.OK,
    message: "Redirect to payment provider",
    success: true,
  });
});

const verifyStripePaymentSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Stripe session Id not found");
  }

  const { statusCode, success, message } = await PaymentServices.verifyStripPayment(sessionId);

  ApiResponse(res, {
    data: null,
    statusCode,
    success,
    message,
  });
});

export const PaymentControllers = { initiatePayment, verifyStripePaymentSession };
