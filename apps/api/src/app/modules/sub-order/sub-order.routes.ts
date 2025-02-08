import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { SubOrderControllers } from "./sub-order.controllers";
import { updateSubOrderStatusValidationSchema } from "./sub-order.validation";

const router = Router();

// Enforce all routes for seller only
router.use(authMiddleware(UserRole.SELLER));

// Retrieved all orders for seller
router.get("/", SubOrderControllers.getSellerAllOrders);

// Update sub order status
router.put("/:id", zodSafeParse(updateSubOrderStatusValidationSchema), SubOrderControllers.updateSubOrderStatus);

const SubOrderRoutes = router;

export default SubOrderRoutes;
