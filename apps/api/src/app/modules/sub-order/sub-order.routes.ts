import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { SubOrderControllers } from "./sub-order.controllers";

const router = Router();

// Enforce all routes for seller only
router.use(authMiddleware(UserRole.SELLER));

router.get("/", SubOrderControllers.getSellerAllOrders);

const SubOrderRoutes = router;

export default SubOrderRoutes;
