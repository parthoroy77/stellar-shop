import { UserRole } from "@repo/prisma/client";
import { createShippingOptionValidationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { ShippingControllers } from "./shipping.controllers";

const router = Router();

router.get("/", ShippingControllers.getAllShippingOptions);

router.post(
  "/",
  authMiddleware(UserRole.ADMIN),
  zodSafeParse(createShippingOptionValidationSchema),
  ShippingControllers.createShippingOption
);

const ShippingRoutes = router;

export default ShippingRoutes;
