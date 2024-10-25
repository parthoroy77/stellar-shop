-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_parentCategoryId_fkey";

-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "parentCategoryId" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE',
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Files" ALTER COLUMN "fileType" SET DEFAULT 'IMAGE',
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "ProductVariants" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Sellers" ALTER COLUMN "status" SET DEFAULT 'INACTIVE';

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
