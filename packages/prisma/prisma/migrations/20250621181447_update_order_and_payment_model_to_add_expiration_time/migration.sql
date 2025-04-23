-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "paymentExpiresAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "expiresAt" TIMESTAMP(3);
