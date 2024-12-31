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

router.get("/", authMiddleware(UserRole.BUYER), CartControllers.getUserAllCartItems);
router.delete("/", authMiddleware(UserRole.BUYER), CartControllers.clearUserAllCartItems);
router.delete("/:id", authMiddleware(UserRole.BUYER), CartControllers.deleteUserCartItem);

const CartRoutes = router;
export default CartRoutes;
