import { UserRole } from "@repo/prisma/client";
import { addToCartValidationSchema, z } from "@repo/utils/validations";
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
router.patch("/", authMiddleware(UserRole.BUYER), CartControllers.updateUserCartItem);
router.delete("/", authMiddleware(UserRole.BUYER), CartControllers.clearUserAllCartItems);
router.delete("/:id", authMiddleware(UserRole.BUYER), CartControllers.deleteUserCartItem);
router.post(
  "/summary",
  authMiddleware(UserRole.BUYER),
  zodSafeParse(
    z.object({
      items: z.array(z.string().or(z.number())),
    })
  ),
  CartControllers.calculateCartSummary
);
const CartRoutes = router;
export default CartRoutes;
