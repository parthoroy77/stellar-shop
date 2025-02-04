import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { PaymentMethodControllers } from "./payment-method.controllers";
import { addPaymentMethodValidationSchema, addPaymentProviderValidationSchema } from "./payment-method.validation";

const router = Router();

// Payment method routes
router.get("/", authMiddleware(), PaymentMethodControllers.getPaymentMethods);
router.post(
  "/",
  authMiddleware(UserRole.ADMIN),
  zodSafeParse(addPaymentMethodValidationSchema),
  PaymentMethodControllers.addNewPaymentMethod
);

// Payment provider routes
router.post(
  "/provider",
  authMiddleware(UserRole.ADMIN),
  zodSafeParse(addPaymentProviderValidationSchema),
  PaymentMethodControllers.addNewPaymentProvider
);

const PaymentMethodRoutes = router;

export default PaymentMethodRoutes;
