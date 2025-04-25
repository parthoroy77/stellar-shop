import prisma from "@repo/prisma/client";
import { IOrderItem } from "@repo/utils/types";
import { StatusCodes } from "http-status-codes";
import Stripe from "stripe";
import config from "../../config";
import { ApiError } from "../../handlers/ApiError";
import { stripeInstance } from "../../services/stripe";

export const handleStripePayment = async (orderId: number) => {
  const payment = await prisma.payment.findFirst({ where: { orderId } });

  if (payment?.status !== "PROCESSING") {
    throw new ApiError(StatusCodes.NOT_FOUND, "Payment information not found");
  }

  if (payment.expiresAt && new Date() > new Date(payment.expiresAt)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Payment time expired. Order will be canceled.");
  }

  const orderItems = await prisma.orderItem.findMany({
    where: { orderId },
    select: {
      id: true,
      price: true,
      quantity: true,
      totalAmount: true,
      product: {
        select: { productName: true, images: { take: 1, select: { file: { select: { fileSecureUrl: true } } } } },
      },
    },
  });

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = orderItems.map((item) => ({
    price_data: {
      currency: "bdt",
      product_data: {
        name: item.product.productName,
        images: [item.product.images[0]?.file.fileSecureUrl] as string[],
      },
      unit_amount: (item as unknown as Pick<IOrderItem, "totalAmount">).totalAmount * 100,
    },
    quantity: item.quantity,
  }));

  const checkoutSession = await stripeInstance.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    metadata: { orderId, paymentId: payment.id },
    success_url:
      config.buyer_origin_url +
      `/payment/verify?provider=stripe&paymentId=${payment.uniqueId}&stripeSessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: config.buyer_origin_url + "/payment/cancel",
  });

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({ data: { status: "PENDING" }, where: { id: payment.id } });
    await tx.order.update({ where: { id: orderId }, data: { paymentStatus: "PENDING" } });
  });

  return { redirectUrl: checkoutSession.url };
};
