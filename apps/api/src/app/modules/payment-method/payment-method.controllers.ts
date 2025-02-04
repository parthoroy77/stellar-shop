import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { PaymentMethodServices } from "./payment-method.services";

const addNewPaymentProvider = asyncHandler(async (req, res) => {
  const payload = req.body;
  await PaymentMethodServices.addProvider(payload);
  ApiResponse(res, {
    data: {},
    message: "Payment provider added successfully!",
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});

const addNewPaymentMethod = asyncHandler(async (req, res) => {
  const { providerId, ...rest } = req.body;
  await PaymentMethodServices.addMethod({ providerId: +providerId, ...rest });
  ApiResponse(res, {
    data: {},
    message: "Payment method added successfully!",
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});

const getPaymentMethods = asyncHandler(async (_req, res) => {
  const result = await PaymentMethodServices.getPaymentMethods();
  ApiResponse(res, {
    data: result,
    message: "Payment method fetched successfully!",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

export const PaymentMethodControllers = {
  addNewPaymentMethod,
  addNewPaymentProvider,
  getPaymentMethods,
};
