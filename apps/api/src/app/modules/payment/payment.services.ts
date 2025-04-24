import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { handleStripePayment } from "./payment.utils";

const initiate = async (orderId: string) => {
  const order = await prisma.order.findFirst({
    where: { uniqueId: orderId },
    include: {
      user: {
        select: {
          fullName: true,
          email: true,
        },
      },
      paymentMethod: {
        select: {
          name: true,
          type: true,
        },
      },
    },
  });

  if (!order) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Order not found");
  }

  if (order.status !== "PLACED") {
    throw new ApiError(StatusCodes.NOT_FOUND, "Order is not available for payment");
  }

  if (order.paymentExpiresAt && new Date() > new Date(order.paymentExpiresAt)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Payment time expired. Order will be canceled.");
  }

  if (order.paymentMethod.type === "COD") {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Order for this payment set to Cash on delivery");
  }

  const providerName = order.paymentMethod.name.toLowerCase();

  // Handle payment from different provider
  switch (providerName.toLowerCase()) {
    case "stripe":
      return await handleStripePayment(order.id);
    default:
      throw new ApiError(StatusCodes.BAD_REQUEST, "Unsupported payment provider");
  }
};

export const PaymentServices = { initiate };
