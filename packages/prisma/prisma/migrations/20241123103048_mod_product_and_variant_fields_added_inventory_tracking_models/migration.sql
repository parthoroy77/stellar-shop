/*
  Warnings:

  - You are about to drop the column `stockQuantity` on the `ProductVariants` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `ProductVariants` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `stockQuantity` on the `Products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueId]` on the table `ProductVariants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uniqueId]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stock` to the `ProductVariants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueId` to the `ProductVariants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InventoryLogAction" AS ENUM ('ADDITION', 'DEDUCTION');

-- CreateEnum
CREATE TYPE "InventoryLogType" AS ENUM ('NEW_PRODUCT', 'RESTOCK', 'SALE', 'REFUND');

-- CreateEnum
CREATE TYPE "RestockInventoryRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- DropIndex
DROP INDEX "ProductVariants_variantId_key";

-- DropIndex
DROP INDEX "Products_productId_key";

-- AlterTable
ALTER TABLE "ProductVariants" DROP COLUMN "stockQuantity",
DROP COLUMN "variantId",
ADD COLUMN     "stock" INTEGER NOT NULL,
ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "productId",
DROP COLUMN "stockQuantity",
ADD COLUMN     "stock" INTEGER NOT NULL,
ADD COLUMN     "uniqueId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "InventoryLogs" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "variantId" INTEGER,
    "type" "InventoryLogType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "action" "InventoryLogAction" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestockInventoryRequests" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "variantId" INTEGER,
    "quantity" INTEGER NOT NULL,
    "requestedBy" INTEGER NOT NULL,
    "approvedBy" INTEGER NOT NULL,
    "approvedAt" TIMESTAMP(3),
    "status" "RestockInventoryRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestockInventoryRequests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InventoryLogs_productId_variantId_idx" ON "InventoryLogs"("productId", "variantId");

-- CreateIndex
CREATE INDEX "RestockInventoryRequests_productId_variantId_requestedBy_ap_idx" ON "RestockInventoryRequests"("productId", "variantId", "requestedBy", "approvedBy");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariants_uniqueId_key" ON "ProductVariants"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Products_uniqueId_key" ON "Products"("uniqueId");

-- AddForeignKey
ALTER TABLE "InventoryLogs" ADD CONSTRAINT "InventoryLogs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLogs" ADD CONSTRAINT "InventoryLogs_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestockInventoryRequests" ADD CONSTRAINT "RestockInventoryRequests_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestockInventoryRequests" ADD CONSTRAINT "RestockInventoryRequests_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
