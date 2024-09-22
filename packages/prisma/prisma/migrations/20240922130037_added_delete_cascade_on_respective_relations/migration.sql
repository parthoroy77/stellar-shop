-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Carts" DROP CONSTRAINT "Carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "OAuthAccounts" DROP CONSTRAINT "OAuthAccounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttribues" DROP CONSTRAINT "ProductAttribues_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariantAttributes" DROP CONSTRAINT "ProductVariantAttributes_variantId_fkey";

-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPasswords" DROP CONSTRAINT "UserPasswords_userId_fkey";

-- DropForeignKey
ALTER TABLE "WishlistItems" DROP CONSTRAINT "WishlistItems_wishlistId_fkey";

-- DropForeignKey
ALTER TABLE "Wishlists" DROP CONSTRAINT "Wishlists_userId_fkey";

-- DropIndex
DROP INDEX "Users_email_phoneNumber_idx";

-- CreateIndex
CREATE INDEX "Users_email_phoneNumber_fullName_idx" ON "Users"("email", "phoneNumber", "fullName");

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttribues" ADD CONSTRAINT "ProductAttribues_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariantAttributes" ADD CONSTRAINT "ProductVariantAttributes_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "Carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthAccounts" ADD CONSTRAINT "OAuthAccounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPasswords" ADD CONSTRAINT "UserPasswords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlists" ADD CONSTRAINT "Wishlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItems" ADD CONSTRAINT "WishlistItems_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
