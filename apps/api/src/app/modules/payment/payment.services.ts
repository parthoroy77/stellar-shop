import prisma from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { stripeInstance } from "../../services/stripe";
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

const verifyStripPayment = async (sessionId: string) => {
  const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

  if (!session) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Stripe session invalid");
  }

  if (session.payment_status !== "paid") {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Payment not completed yet");
  }

  const { orderId, paymentId } = session.metadata as { orderId: string; paymentId: string };

  const payment = await prisma.payment.findFirst({
    where: { orderId: +orderId, id: +paymentId },
    select: { id: true, uniqueId: true, order: { select: { uniqueId: true } }, status: true },
  });

  if (!payment) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Payment information not found");
  }

  if (payment.status === "COMPLETED") {
    return {
      success: false,
      statusCode: StatusCodes.CONFLICT,
      message: "Payment already processed",
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: payment.id },
      data: { gatewayTransactionId: (session.payment_intent as string) || sessionId, status: "COMPLETED" },
    });

    await tx.order.update({
      where: { id: +orderId },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
        orderStatusHistory: { create: { status: "CONFIRMED" } },
      },
    });

    await tx.subOrder.update({
      where: { id: +orderId },
      data: {
        status: "CONFIRMED",
      },
    });
    return;
  });

  return {
    data: {
      orderId: payment.order.uniqueId,
      paymentId: payment.uniqueId,
    },
    statusCode: StatusCodes.OK,
    message: "Payment verified successfully",
    success: true,
  };
};

export const PaymentServices = { initiate, verifyStripPayment };
