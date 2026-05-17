/*
  Warnings:

  - You are about to drop the column `wordId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userWordId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_wordId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_userId_fkey";

-- DropIndex
DROP INDEX "Review_wordId_idx";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "wordId",
ADD COLUMN     "userWordId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Word";

-- CreateTable
CREATE TABLE "Vocabulary" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "hinglishMeaning" TEXT,
    "exampleSentence" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWord" (
    "id" TEXT NOT NULL,
    "sourceSentence" TEXT,
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "intervalDays" INTEGER NOT NULL DEFAULT 1,
    "repetitionCount" INTEGER NOT NULL DEFAULT 0,
    "nextReviewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "vocabularyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vocabulary_word_idx" ON "Vocabulary"("word");

-- CreateIndex
CREATE UNIQUE INDEX "Vocabulary_word_meaning_key" ON "Vocabulary"("word", "meaning");

-- CreateIndex
CREATE INDEX "UserWord_userId_idx" ON "UserWord"("userId");

-- CreateIndex
CREATE INDEX "UserWord_vocabularyId_idx" ON "UserWord"("vocabularyId");

-- CreateIndex
CREATE INDEX "UserWord_nextReviewDate_idx" ON "UserWord"("nextReviewDate");

-- CreateIndex
CREATE UNIQUE INDEX "UserWord_userId_vocabularyId_key" ON "UserWord"("userId", "vocabularyId");

-- CreateIndex
CREATE INDEX "Review_userWordId_idx" ON "Review"("userWordId");

-- AddForeignKey
ALTER TABLE "UserWord" ADD CONSTRAINT "UserWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWord" ADD CONSTRAINT "UserWord_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "Vocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userWordId_fkey" FOREIGN KEY ("userWordId") REFERENCES "UserWord"("id") ON DELETE CASCADE ON UPDATE CASCADE;
