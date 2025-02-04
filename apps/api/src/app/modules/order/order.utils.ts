import { PaymentMethodType } from "@repo/prisma/client";
import { StatusCodes } from "http-status-codes";
import config from "../../config";

/**
 * Determine the redirect URL after placing an order based on the payment method type.
 * @param type - Payment method type
 * @returns Redirect information including URL, status code, and message.
 */
export const handlePaymentRedirect = (type: PaymentMethodType) => {
  const redirectConfig: Record<string, string> = {
    COD: config.buyer_origin_url + "/order-success",
  };

  return {
    redirectUrl: redirectConfig[type] || config.buyer_origin_url + "/order-failed",
    statusCode: StatusCodes.CREATED,
    message: "Order placed successfully!",
  };
};
