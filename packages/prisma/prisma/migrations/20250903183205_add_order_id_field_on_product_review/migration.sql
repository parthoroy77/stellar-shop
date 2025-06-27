/*
  Warnings:

  - Added the required column `orderId` to the `ProductReviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ProductReviews_productId_userId_rating_idx";

-- AlterTable
ALTER TABLE "ProductReviews" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "ProductReviews_productId_userId_rating_orderId_idx" ON "ProductReviews"("productId", "userId", "rating", "orderId");

-- AddForeignKey
ALTER TABLE "ProductReviews" ADD CONSTRAINT "ProductReviews_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
