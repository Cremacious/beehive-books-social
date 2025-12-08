/*
  Warnings:

  - A unique constraint covering the columns `[clubId,title,author]` on the table `club_reading_list_item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author` to the `club_reading_list_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `club_reading_list_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "club_reading_list_item" DROP CONSTRAINT "club_reading_list_item_bookId_fkey";

-- DropIndex
DROP INDEX "club_reading_list_item_bookId_clubId_key";

-- AlterTable
ALTER TABLE "club_reading_list_item" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "bookId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "club_reading_list_item_clubId_title_author_key" ON "club_reading_list_item"("clubId", "title", "author");

-- AddForeignKey
ALTER TABLE "club_reading_list_item" ADD CONSTRAINT "club_reading_list_item_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
