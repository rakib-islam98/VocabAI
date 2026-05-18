/*
  Warnings:

  - You are about to drop the column `exampleSentence` on the `Vocabulary` table. All the data in the column will be lost.
  - You are about to drop the column `hinglishMeaning` on the `Vocabulary` table. All the data in the column will be lost.
  - You are about to drop the column `meaning` on the `Vocabulary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[word,partOfSpeech,hindiMeaning]` on the table `Vocabulary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `example` to the `Vocabulary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hindiMeaning` to the `Vocabulary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hinglishExplanation` to the `Vocabulary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePrompt` to the `Vocabulary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partOfSpeech` to the `Vocabulary` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Vocabulary_word_meaning_key";

-- AlterTable
ALTER TABLE "Vocabulary" DROP COLUMN "exampleSentence",
DROP COLUMN "hinglishMeaning",
DROP COLUMN "meaning",
ADD COLUMN     "example" TEXT NOT NULL,
ADD COLUMN     "hindiMeaning" TEXT NOT NULL,
ADD COLUMN     "hinglishExplanation" TEXT NOT NULL,
ADD COLUMN     "imagePrompt" TEXT NOT NULL,
ADD COLUMN     "partOfSpeech" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Vocabulary_partOfSpeech_idx" ON "Vocabulary"("partOfSpeech");

-- CreateIndex
CREATE UNIQUE INDEX "Vocabulary_word_partOfSpeech_hindiMeaning_key" ON "Vocabulary"("word", "partOfSpeech", "hindiMeaning");
