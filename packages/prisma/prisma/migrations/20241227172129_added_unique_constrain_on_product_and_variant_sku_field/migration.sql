/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `ProductVariants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductVariants_sku_key" ON "ProductVariants"("sku");
