/*
  Warnings:

  - You are about to alter the column `contactNumber` on the `Sellers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `businessEmail` on the `Sellers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - A unique constraint covering the columns `[contactNumber]` on the table `Sellers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[businessEmail]` on the table `Sellers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Sellers" ALTER COLUMN "contactNumber" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "businessEmail" SET DATA TYPE VARCHAR(20);

-- CreateIndex
CREATE UNIQUE INDEX "Sellers_contactNumber_key" ON "Sellers"("contactNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Sellers_businessEmail_key" ON "Sellers"("businessEmail");
