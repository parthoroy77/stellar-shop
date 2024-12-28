import { UserRole } from "@repo/prisma/client";
import { addToWishlistValidationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { WishlistControllers } from "./wishlist.controllers";

const router = Router();

router.post(
  "/toggle",
  authMiddleware(UserRole.BUYER),
  zodSafeParse(addToWishlistValidationSchema),
  WishlistControllers.manageAddProductToWishlist
);

const WishlistRoutes = router;
export default WishlistRoutes;
