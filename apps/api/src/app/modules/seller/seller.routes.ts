import { UserRole } from "@repo/prisma/client";
import { sellerOnboardingValidationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { upload } from "../../middleware/multer.middleware";
import { SellerControllers } from "./seller.controllers";

const router = Router();

router.get("/", authMiddleware(UserRole.SELLER), SellerControllers.getMySellerProfile);

router.post(
  "/onboarding",
  authMiddleware(UserRole.SELLER),
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  zodSafeParse(sellerOnboardingValidationSchema.omit({ logo: true, banner: true, isPrimary: true })),
  SellerControllers.sellerOnboarding
);

router.get(
  "/onboarding/status/:userId",
  authMiddleware(UserRole.ADMIN, UserRole.SELLER),
  SellerControllers.sellerOnboardingStatus
);

router.get("/get-all", authMiddleware(UserRole.ADMIN), SellerControllers.getAllSellers);

router.post("/approve/seller/:sellerId", authMiddleware(UserRole.ADMIN), SellerControllers.sellerApproval);

const SellerRoutes = router;

export default SellerRoutes;
