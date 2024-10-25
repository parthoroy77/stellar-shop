/*
  Warnings:

  - You are about to drop the column `categoryImageUrl` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `associatedEntityId` on the `Files` table. All the data in the column will be lost.
  - Added the required column `description` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "categoryImageUrl",
ADD COLUMN     "description" VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE "Files" DROP COLUMN "associatedEntityId";

-- CreateTable
CREATE TABLE "CategoryFiles" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "fileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductFiles" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "fileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantFiles" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER NOT NULL,
    "fileId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VariantFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoryFiles" ADD CONSTRAINT "CategoryFiles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryFiles" ADD CONSTRAINT "CategoryFiles_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFiles" ADD CONSTRAINT "ProductFiles_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductFiles" ADD CONSTRAINT "ProductFiles_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantFiles" ADD CONSTRAINT "VariantFiles_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantFiles" ADD CONSTRAINT "VariantFiles_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
