import { UserRole } from "@repo/prisma/client";
import { attributeValidationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { AttributeControllers } from "./attribute.controllers";

const router = Router();

router.get("/", authMiddleware(), AttributeControllers.getAllAttributes);
router.get("/all", authMiddleware(), AttributeControllers.getAttributesWithValues);
router.get("/values/:attributeId", authMiddleware(), AttributeControllers.getValuesByAttribute);
router.post(
  "/",
  authMiddleware(UserRole.ADMIN),
  zodSafeParse(attributeValidationSchema),
  AttributeControllers.createAttribute
);

const AttributeRoutes = router;
export default AttributeRoutes;
