import { UserRole } from "@repo/prisma/client";
import { attributeValidationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { AttributeControllers } from "./attribute.controllers";

const router = Router();

router.get("/", AttributeControllers.getAllAttributes);
router.get("/all", AttributeControllers.getAttributesWithValues);
router.get("/values/:attributeId", AttributeControllers.getValuesByAttribute);
router.post(
  "/",
  authMiddleware(UserRole.ADMIN),
  zodSafeParse(attributeValidationSchema),
  AttributeControllers.createAttribute
);

const AttributeRoutes = router;
export default AttributeRoutes;
