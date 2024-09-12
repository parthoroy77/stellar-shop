-- CreateEnum
CREATE TYPE "CategoryStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "CategoryLevel" AS ENUM ('COLLECTION', 'CATEGORY', 'SUB_CATEGORY');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('IMAGE', 'PDF', 'VIDEO');

-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'DELETED');

-- CreateTable
CREATE TABLE "Attributes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributeValues" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "attributeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttributeValues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariantAttribute" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "variantName" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ProductVariantAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "urlSlug" TEXT NOT NULL,
    "parentCategoryId" INTEGER NOT NULL,
    "categoryImageUrl" TEXT NOT NULL,
    "level" "CategoryLevel" NOT NULL,
    "status" "CategoryStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategories" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "description" TEXT,
    "fileSize" INTEGER NOT NULL,
    "filePublicId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSecureUrl" TEXT NOT NULL,
    "uploadedBy" INTEGER NOT NULL,
    "associatedEntityId" INTEGER,
    "fileType" "FileType" NOT NULL,
    "status" "FileStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Attributes_name_idx" ON "Attributes"("name");

-- CreateIndex
CREATE INDEX "AttributeValues_name_attributeId_idx" ON "AttributeValues"("name", "attributeId");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_urlSlug_key" ON "Categories"("urlSlug");

-- CreateIndex
CREATE INDEX "Categories_urlSlug_categoryName_idx" ON "Categories"("urlSlug", "categoryName");

-- AddForeignKey
ALTER TABLE "AttributeValues" ADD CONSTRAINT "AttributeValues_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
