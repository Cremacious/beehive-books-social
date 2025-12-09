/*
  Warnings:

  - You are about to drop the column `authorName` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `comment` table. All the data in the column will be lost.
  - Added the required column `userId` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comment" DROP COLUMN "authorName",
DROP COLUMN "avatar",
DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
