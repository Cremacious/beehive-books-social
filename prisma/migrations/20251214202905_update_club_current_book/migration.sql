/*
  Warnings:

  - You are about to drop the column `currentBookId` on the `club` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "club" DROP CONSTRAINT "club_currentBookId_fkey";

-- AlterTable
ALTER TABLE "club" DROP COLUMN "currentBookId",
ADD COLUMN     "currentBookAuthor" TEXT,
ADD COLUMN     "currentBookChapterCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currentBookTitle" TEXT;
