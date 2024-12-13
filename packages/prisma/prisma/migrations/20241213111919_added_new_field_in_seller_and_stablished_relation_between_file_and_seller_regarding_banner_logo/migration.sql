/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `Sellers` table. All the data in the column will be lost.
  - Added the required column `businessEmail` to the `Sellers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopBannerId` to the `Sellers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopLogoId` to the `Sellers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sellers" DROP COLUMN "logoUrl",
ADD COLUMN     "businessEmail" TEXT NOT NULL,
ADD COLUMN     "shopBannerId" INTEGER NOT NULL,
ADD COLUMN     "shopLogoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Sellers" ADD CONSTRAINT "Sellers_shopLogoId_fkey" FOREIGN KEY ("shopLogoId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sellers" ADD CONSTRAINT "Sellers_shopBannerId_fkey" FOREIGN KEY ("shopBannerId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
