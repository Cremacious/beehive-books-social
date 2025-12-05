-- CreateEnum
CREATE TYPE "PromptStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "prompt" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "PromptStatus" NOT NULL DEFAULT 'OPEN',
    "userId" TEXT NOT NULL,
    "responseCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_entry" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "promptId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "prompt_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt_comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "prompt_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PromptInvitations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PromptInvitations_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PromptInvitations_B_index" ON "_PromptInvitations"("B");

-- AddForeignKey
ALTER TABLE "prompt" ADD CONSTRAINT "prompt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_entry" ADD CONSTRAINT "prompt_entry_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_entry" ADD CONSTRAINT "prompt_entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_comment" ADD CONSTRAINT "prompt_comment_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "prompt_entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_comment" ADD CONSTRAINT "prompt_comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt_comment" ADD CONSTRAINT "prompt_comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "prompt_comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromptInvitations" ADD CONSTRAINT "_PromptInvitations_A_fkey" FOREIGN KEY ("A") REFERENCES "prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromptInvitations" ADD CONSTRAINT "_PromptInvitations_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
