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

router.get("/", authMiddleware(UserRole.BUYER), WishlistControllers.getUserAllWishlistItems);
router.delete("/:id", authMiddleware(UserRole.BUYER), WishlistControllers.deleteUserWishlistItem);

const WishlistRoutes = router;
export default WishlistRoutes;
