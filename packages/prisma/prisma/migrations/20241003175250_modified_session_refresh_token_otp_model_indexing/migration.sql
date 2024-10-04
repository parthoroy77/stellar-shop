-- DropIndex
DROP INDEX "OTPRequests_userEmail_code_idx";

-- DropIndex
DROP INDEX "RefreshTokens_userId_idx";

-- DropIndex
DROP INDEX "Sessions_userId_idx";

-- CreateIndex
CREATE INDEX "OTPRequests_userEmail_code_expiresAt_idx" ON "OTPRequests"("userEmail", "code", "expiresAt");

-- CreateIndex
CREATE INDEX "RefreshTokens_userId_token_expiresAt_idx" ON "RefreshTokens"("userId", "token", "expiresAt");

-- CreateIndex
CREATE INDEX "Sessions_userId_sessionToken_expiresAt_idx" ON "Sessions"("userId", "sessionToken", "expiresAt");
