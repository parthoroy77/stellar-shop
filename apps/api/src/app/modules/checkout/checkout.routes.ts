import { UserRole } from "@repo/prisma/client";
import { AnyZodObject } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { CheckoutControllers } from "./checkout.controllers";
import { checkoutInitiateValidationSchema, checkoutUpdateValidationSchema } from "./checkout.validation";

const router = Router();

// Start initiate checkout session
router.post(
  "/initiate",
  authMiddleware(UserRole.BUYER),
  zodSafeParse(checkoutInitiateValidationSchema as unknown as AnyZodObject),
  CheckoutControllers.initializeCheckout
);

// Get user current checkout session
router.get("/session", authMiddleware(UserRole.BUYER), CheckoutControllers.getUserCheckoutSession);

// Get user current checkout summary
router.get("/summary", authMiddleware(UserRole.BUYER), CheckoutControllers.getCheckoutSummary);

// Update checkout session fields
router.put(
  "/update",
  authMiddleware(UserRole.BUYER),
  zodSafeParse(checkoutUpdateValidationSchema as unknown as AnyZodObject),
  CheckoutControllers.updateCheckoutSession
);

const CheckoutRoutes = router;

export default CheckoutRoutes;
