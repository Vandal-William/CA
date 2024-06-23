-- CreateTable
CREATE TABLE "TempComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,

    CONSTRAINT "TempComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TempComment" ADD CONSTRAINT "TempComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
