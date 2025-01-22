/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentMethodId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PROCESSING', 'PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMethodStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "orderCanceledAt" TIMESTAMP(3),
ADD COLUMN     "orderPackedAt" TIMESTAMP(3),
ADD COLUMN     "paymentId" INTEGER,
ADD COLUMN     "paymentMethodId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PaymentMethods" (
    "id" SERIAL NOT NULL,
    "methodName" TEXT NOT NULL,
    "description" TEXT,
    "status" "PaymentMethodStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,
    "gatewayTransactionId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PROCESSING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_uniqueId_key" ON "Payments"("uniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_orderId_key" ON "Payments"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_gatewayTransactionId_key" ON "Payments"("gatewayTransactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_paymentId_key" ON "Orders"("paymentId");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
