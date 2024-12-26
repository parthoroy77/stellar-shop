import { UserRole } from "@repo/prisma/client";
import { z } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { TagControllers } from "./tag.controllers";

const router = Router();

router.get("/", authMiddleware(), TagControllers.getAllTags);
router.post(
  "/",
  zodSafeParse(z.object({ name: z.string() })),
  authMiddleware(UserRole.SELLER, UserRole.ADMIN),
  TagControllers.createTag
);
router.post(
  "/bulk",
  zodSafeParse(
    z.object({
      values: z.array(z.string()),
    })
  ),

  authMiddleware(UserRole.SELLER, UserRole.ADMIN),
  TagControllers.bulkCreateTag
);

const TagRoutes = router;
export default TagRoutes;
