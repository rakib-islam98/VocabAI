/*
  Warnings:

  - You are about to drop the column `easeFactor` on the `UserWord` table. All the data in the column will be lost.
  - You are about to drop the column `intervalDays` on the `UserWord` table. All the data in the column will be lost.
  - You are about to drop the column `lastReviewedAt` on the `UserWord` table. All the data in the column will be lost.
  - You are about to drop the column `nextReviewDate` on the `UserWord` table. All the data in the column will be lost.
  - You are about to drop the column `repetitionCount` on the `UserWord` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userWordId_fkey";

-- DropIndex
DROP INDEX "UserWord_nextReviewDate_idx";

-- AlterTable
ALTER TABLE "UserWord" DROP COLUMN "easeFactor",
DROP COLUMN "intervalDays",
DROP COLUMN "lastReviewedAt",
DROP COLUMN "nextReviewDate",
DROP COLUMN "repetitionCount",
ADD COLUMN     "correctAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "difficultyBucket" TEXT NOT NULL DEFAULT 'medium',
ADD COLUMN     "lastPracticedAt" TIMESTAMP(3),
ADD COLUMN     "masteryScore" DOUBLE PRECISION NOT NULL DEFAULT 50,
ADD COLUMN     "wrongAttempts" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "ReviewSession" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "totalExercises" INTEGER NOT NULL,
    "exercises" JSONB NOT NULL,
    "answers" JSONB,
    "score" DOUBLE PRECISION,
    "startedAt" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewAttempt" (
    "id" TEXT NOT NULL,
    "exerciseType" TEXT NOT NULL,
    "selectedAnswer" TEXT,
    "correctAnswer" TEXT NOT NULL,
    "wasCorrect" BOOLEAN NOT NULL,
    "userWordId" TEXT NOT NULL,
    "reviewSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReviewSession_userId_idx" ON "ReviewSession"("userId");

-- CreateIndex
CREATE INDEX "ReviewSession_status_idx" ON "ReviewSession"("status");

-- CreateIndex
CREATE INDEX "ReviewAttempt_userId_idx" ON "ReviewAttempt"("userId");

-- CreateIndex
CREATE INDEX "ReviewAttempt_userWordId_idx" ON "ReviewAttempt"("userWordId");

-- CreateIndex
CREATE INDEX "ReviewAttempt_reviewSessionId_idx" ON "ReviewAttempt"("reviewSessionId");

-- CreateIndex
CREATE INDEX "UserWord_difficultyBucket_idx" ON "UserWord"("difficultyBucket");

-- AddForeignKey
ALTER TABLE "ReviewSession" ADD CONSTRAINT "ReviewSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewAttempt" ADD CONSTRAINT "ReviewAttempt_userWordId_fkey" FOREIGN KEY ("userWordId") REFERENCES "UserWord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewAttempt" ADD CONSTRAINT "ReviewAttempt_reviewSessionId_fkey" FOREIGN KEY ("reviewSessionId") REFERENCES "ReviewSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewAttempt" ADD CONSTRAINT "ReviewAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
