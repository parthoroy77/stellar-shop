-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('COD', 'CARD', 'NET_BANKING', 'WALLET');

-- AlterTable
ALTER TABLE "PaymentMethods" ADD COLUMN     "type" "PaymentMethodType" NOT NULL DEFAULT 'COD';
