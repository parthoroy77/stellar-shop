import config from "../../config";

/**
 * Determine the redirect URL after placing an order based on the payment method type.
 * @param type - Payment method type
 * @param orderId - Order Id
 * @returns Redirect information including URL, status code, and message.
 */
export const handlePaymentRedirect = (type: "cod" | "other", orderId: string) => {
  let redirectUrl = "";

  switch (type) {
    case "cod":
      redirectUrl = config.buyer_origin_url + "/order-success?orderId=" + orderId;
      break;
    case "other":
      redirectUrl = config.buyer_origin_url + "/payment?orderId=" + orderId;
      break;
    default:
      redirectUrl = config.buyer_origin_url + "/";
      break;
  }

  return { redirectUrl };
};
