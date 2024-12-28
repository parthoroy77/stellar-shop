import { UserRole } from "@repo/prisma/client";
import { addToCartValidationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { CartControllers } from "./cart.controllers";

const router = Router();

router.post(
  "/",
  authMiddleware(UserRole.BUYER),
  zodSafeParse(addToCartValidationSchema),
  CartControllers.manageAddProductToCart
);

const CartRoutes = router;
export default CartRoutes;
