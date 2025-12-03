-- CreateEnum
CREATE TYPE "ClubRole" AS ENUM ('OWNER', 'MEMBER');

-- CreateEnum
CREATE TYPE "ReadingStatus" AS ENUM ('CURRENT', 'UPCOMING');

-- CreateTable
CREATE TABLE "club" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "currentBookId" TEXT,
    "cover" TEXT,
    "memberCount" INTEGER NOT NULL DEFAULT 0,
    "privacy" "Privacy" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rules" TEXT,
    "tags" TEXT[],

    CONSTRAINT "club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club_member" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "role" "ClubRole" NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "club_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discussion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "discussion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discussion_comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "discussion_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club_reading_list_item" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ReadingStatus" NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "club_reading_list_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "club_member_userId_clubId_key" ON "club_member"("userId", "clubId");

-- CreateIndex
CREATE UNIQUE INDEX "club_reading_list_item_bookId_clubId_key" ON "club_reading_list_item"("bookId", "clubId");

-- AddForeignKey
ALTER TABLE "club" ADD CONSTRAINT "club_currentBookId_fkey" FOREIGN KEY ("currentBookId") REFERENCES "book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_member" ADD CONSTRAINT "club_member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_member" ADD CONSTRAINT "club_member_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion" ADD CONSTRAINT "discussion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "club_member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion" ADD CONSTRAINT "discussion_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_comment" ADD CONSTRAINT "discussion_comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "club_member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_comment" ADD CONSTRAINT "discussion_comment_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_comment" ADD CONSTRAINT "discussion_comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "discussion_comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_reading_list_item" ADD CONSTRAINT "club_reading_list_item_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_reading_list_item" ADD CONSTRAINT "club_reading_list_item_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
