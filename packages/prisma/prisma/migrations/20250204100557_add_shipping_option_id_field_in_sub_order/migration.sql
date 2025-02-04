/*
  Warnings:

  - Added the required column `shippingOptionId` to the `SubOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubOrders" ADD COLUMN     "shippingOptionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SubOrders" ADD CONSTRAINT "SubOrders_shippingOptionId_fkey" FOREIGN KEY ("shippingOptionId") REFERENCES "ShippingOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
