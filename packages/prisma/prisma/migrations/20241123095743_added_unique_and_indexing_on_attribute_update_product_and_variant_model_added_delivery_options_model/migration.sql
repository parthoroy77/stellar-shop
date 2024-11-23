/*
  Warnings:

  - You are about to drop the column `lowStockThreshold` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the `ProductAttribues` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Attributes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[variantId]` on the table `ProductVariants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variantId` to the `ProductVariants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryOptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- AlterEnum
ALTER TYPE "ProductStatus" ADD VALUE 'DRAFT';

-- DropForeignKey
ALTER TABLE "ProductAttribues" DROP CONSTRAINT "ProductAttribues_attributeValueId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttribues" DROP CONSTRAINT "ProductAttribues_productId_fkey";

-- AlterTable
ALTER TABLE "ProductVariants" ADD COLUMN     "variantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "lowStockThreshold",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProductAttribues";

-- CreateTable
CREATE TABLE "ProductAttributes" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "attributeValueId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryOptions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "charge" DOUBLE PRECISION NOT NULL,
    "estimateDays" TEXT NOT NULL,
    "status" "DeliveryOptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDeliverInfos" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "packageWeight" DOUBLE PRECISION NOT NULL,
    "packageHeight" DOUBLE PRECISION NOT NULL,
    "packageWidth" DOUBLE PRECISION NOT NULL,
    "packageLength" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductDeliverInfos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDeliverOptions" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "deliveryOptionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductDeliverOptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductAttributes_productId_attributeValueId_idx" ON "ProductAttributes"("productId", "attributeValueId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryOptions_name_key" ON "DeliveryOptions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductDeliverInfos_productId_key" ON "ProductDeliverInfos"("productId");

-- CreateIndex
CREATE INDEX "ProductDeliverInfos_productId_idx" ON "ProductDeliverInfos"("productId");

-- CreateIndex
CREATE INDEX "ProductDeliverOptions_productId_deliveryOptionId_idx" ON "ProductDeliverOptions"("productId", "deliveryOptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Attributes_name_key" ON "Attributes"("name");

-- CreateIndex
CREATE INDEX "ProductVariantAttributes_variantId_attributeValueId_idx" ON "ProductVariantAttributes"("variantId", "attributeValueId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariants_variantId_key" ON "ProductVariants"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "Products_productId_key" ON "Products"("productId");

-- AddForeignKey
ALTER TABLE "ProductAttributes" ADD CONSTRAINT "ProductAttributes_attributeValueId_fkey" FOREIGN KEY ("attributeValueId") REFERENCES "AttributeValues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributes" ADD CONSTRAINT "ProductAttributes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDeliverInfos" ADD CONSTRAINT "ProductDeliverInfos_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDeliverOptions" ADD CONSTRAINT "ProductDeliverOptions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDeliverOptions" ADD CONSTRAINT "ProductDeliverOptions_deliveryOptionId_fkey" FOREIGN KEY ("deliveryOptionId") REFERENCES "DeliveryOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
