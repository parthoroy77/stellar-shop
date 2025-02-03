import { UserRole } from "@repo/prisma/client";
import { AnyZodObject } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { CheckoutControllers } from "./checkout.controllers";
import { checkoutInitiateValidationSchema } from "./checkout.validation";

const router = Router();

router.post(
  "/initiate",
  authMiddleware(UserRole.BUYER),
  zodSafeParse(checkoutInitiateValidationSchema as unknown as AnyZodObject),
  CheckoutControllers.initializeCheckout
);

router.get("/session", authMiddleware(UserRole.BUYER), CheckoutControllers.getUserCheckoutSession);

const CheckoutRoutes = router;

export default CheckoutRoutes;
