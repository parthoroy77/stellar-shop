import { UserRole } from "@repo/prisma/client";
import { userProfileUpdateValidation } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { upload } from "../../middleware/multer.middleware";
import { UserControllers } from "./user.controllers";

const router = Router();

router.patch("/update", authMiddleware(), zodSafeParse(userProfileUpdateValidation), UserControllers.updateUserProfile);
router.put("/me/avatar", authMiddleware(), upload.single("avatar"), UserControllers.updateUserAvatar);
router.delete("/me/avatar", authMiddleware(), UserControllers.deleteUserAvatar);

// Admin Routes
router.get("/", authMiddleware(UserRole.ADMIN), UserControllers.getAllUsers);

const UserRoutes = router;
export default UserRoutes;
