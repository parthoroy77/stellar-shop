/*
  Warnings:

  - You are about to drop the column `roleId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `UserRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BUYER', 'SELLER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_roleId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "roleId",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'BUYER';

-- DropTable
DROP TABLE "UserRoles";

-- DropEnum
DROP TYPE "Role";
