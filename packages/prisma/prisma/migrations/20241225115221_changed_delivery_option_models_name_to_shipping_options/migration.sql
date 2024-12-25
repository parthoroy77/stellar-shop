/*
  Warnings:

  - You are about to drop the `DeliveryOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductDeliverOptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ShippingOptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "ProductDeliverOptions" DROP CONSTRAINT "ProductDeliverOptions_deliveryOptionId_fkey";

-- DropForeignKey
ALTER TABLE "ProductDeliverOptions" DROP CONSTRAINT "ProductDeliverOptions_productId_fkey";

-- DropTable
DROP TABLE "DeliveryOptions";

-- DropTable
DROP TABLE "ProductDeliverOptions";

-- DropEnum
DROP TYPE "DeliveryOptionStatus";

-- CreateTable
CREATE TABLE "ProductShippingOptions" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "shippingOptionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductShippingOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingOptions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "charge" DOUBLE PRECISION NOT NULL,
    "estimateDays" TEXT NOT NULL,
    "status" "ShippingOptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingOptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductShippingOptions_productId_shippingOptionId_idx" ON "ProductShippingOptions"("productId", "shippingOptionId");

-- CreateIndex
CREATE UNIQUE INDEX "ShippingOptions_name_key" ON "ShippingOptions"("name");

-- AddForeignKey
ALTER TABLE "ProductShippingOptions" ADD CONSTRAINT "ProductShippingOptions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductShippingOptions" ADD CONSTRAINT "ProductShippingOptions_shippingOptionId_fkey" FOREIGN KEY ("shippingOptionId") REFERENCES "ShippingOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
