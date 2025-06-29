import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { AnalyticsControllers } from "./analytics.controllers";

const router = Router();

router.get("/seller", authMiddleware("SELLER"), AnalyticsControllers.getSellerAnalytics);
router.get("/platform", authMiddleware("ADMIN"), AnalyticsControllers.getPlatformInsights);

const AnalyticsRoutes = router;

export default AnalyticsRoutes;
