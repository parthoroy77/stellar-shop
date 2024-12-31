/*
  Warnings:

  - You are about to drop the column `profilePhoto` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[avatarId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "profilePhoto",
ADD COLUMN     "avatarId" INTEGER,
ADD COLUMN     "avatarUrl" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Users_avatarId_key" ON "Users"("avatarId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
