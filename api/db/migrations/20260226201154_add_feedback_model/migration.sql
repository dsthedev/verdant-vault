-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('unassigned', 'in_progress', 'complete');

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "subject" TEXT,
    "feedback" TEXT NOT NULL,
    "slug" TEXT,
    "authorId" INTEGER NOT NULL,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'unassigned',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
