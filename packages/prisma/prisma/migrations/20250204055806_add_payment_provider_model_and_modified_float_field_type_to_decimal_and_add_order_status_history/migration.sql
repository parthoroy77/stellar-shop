/*
  Warnings:

  - You are about to alter the column `price` on the `OrderItems` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `totalAmount` on the `OrderItems` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `totalAmount` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `discountAmount` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `grossAmount` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `netAmount` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `shippingAmount` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the column `methodName` on the `PaymentMethods` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Payments` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - Added the required column `name` to the `PaymentMethods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `PaymentMethods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItems" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "discountAmount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "grossAmount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "netAmount" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "shippingAmount" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "PaymentMethods" DROP COLUMN "methodName",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "providerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);

-- CreateTable
CREATE TABLE "OrderStatusHistory" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentProviders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,

    CONSTRAINT "PaymentProviders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderStatusHistory_orderId_status_idx" ON "OrderStatusHistory"("orderId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentProviders_name_key" ON "PaymentProviders"("name");

-- AddForeignKey
ALTER TABLE "OrderStatusHistory" ADD CONSTRAINT "OrderStatusHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethods" ADD CONSTRAINT "PaymentMethods_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "PaymentProviders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
