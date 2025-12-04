-- CreateTable
CREATE TABLE "reading_list" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "reading_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_list_item" (
    "id" TEXT NOT NULL,
    "readingListId" TEXT NOT NULL,
    "bookId" TEXT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reading_list_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reading_list_item_readingListId_bookId_key" ON "reading_list_item"("readingListId", "bookId");

-- AddForeignKey
ALTER TABLE "reading_list" ADD CONSTRAINT "reading_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_list_item" ADD CONSTRAINT "reading_list_item_readingListId_fkey" FOREIGN KEY ("readingListId") REFERENCES "reading_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_list_item" ADD CONSTRAINT "reading_list_item_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
