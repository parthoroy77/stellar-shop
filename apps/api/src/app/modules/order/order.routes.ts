import { UserRole } from "@repo/prisma/client";
import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { OrderControllers } from "./order.controllers";

const router = Router();

router.post("/place", authMiddleware(UserRole.BUYER), OrderControllers.placeOrder);

const OrderRoutes = router;

export default OrderRoutes;
