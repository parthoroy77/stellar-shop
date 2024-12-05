import { loginSchema, registrationSchema } from "@repo/utils/validations";
import { Router } from "express";
import zodSafeParse, { zodCookieParse } from "../../handlers/zodSafeParse";
import authMiddleware from "../../middleware/auth.middleware";
import { AuthControllers } from "./auth.controllers";
import { resendVerificationEmailSchema, sessionRefreshSchema, verifyAccountSchema } from "./auth.schema";

const AuthRoutes = Router();

AuthRoutes.post("/buyer-registration", zodSafeParse(registrationSchema), AuthControllers.userRegistration("BUYER"));
AuthRoutes.post("/seller-registration", zodSafeParse(registrationSchema), AuthControllers.userRegistration("SELLER"));
AuthRoutes.post("/buyer-login", zodSafeParse(loginSchema), AuthControllers.userLogin("BUYER"));
AuthRoutes.post("/seller-login", zodSafeParse(loginSchema), AuthControllers.userLogin("SELLER"));
AuthRoutes.post("/admin-login", zodSafeParse(loginSchema), AuthControllers.userLogin("ADMIN"));

AuthRoutes.post("/logout", authMiddleware(), AuthControllers.userLogout);
AuthRoutes.post(
  "/resend-verification",
  zodSafeParse(resendVerificationEmailSchema),
  AuthControllers.resendUserVerificationEmail
);
AuthRoutes.post("/verify-account", zodSafeParse(verifyAccountSchema), AuthControllers.verifyUserEmail);
AuthRoutes.post("/refresh-session", zodCookieParse(sessionRefreshSchema), AuthControllers.userSessionRefresh);
AuthRoutes.get("/get-me", authMiddleware(), AuthControllers.getUserSession);
export default AuthRoutes;
