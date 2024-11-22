/*
  Warnings:

  - A unique constraint covering the columns `[categoryName]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "CategoryStatus" ADD VALUE 'FEATURED';

-- DropIndex
DROP INDEX "Categories_urlSlug_categoryName_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Categories_categoryName_key" ON "Categories"("categoryName");

-- CreateIndex
CREATE INDEX "Categories_urlSlug_categoryName_parentCategoryId_idx" ON "Categories"("urlSlug", "categoryName", "parentCategoryId");

-- CreateIndex
CREATE INDEX "ProductCategories_categoryId_idx" ON "ProductCategories"("categoryId");
