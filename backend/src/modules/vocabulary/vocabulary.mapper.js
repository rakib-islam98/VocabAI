export const mapUserVocabulary = (userWord) => {
  return {
    id: userWord.id,

    word: userWord.vocabulary.word,
    meaning: userWord.vocabulary.meaning,
    hinglishMeaning: userWord.vocabulary.hinglishMeaning,
    exampleSentence: userWord.vocabulary.exampleSentence,

    sourceSentence: userWord.sourceSentence,

    easeFactor: userWord.easeFactor,
    repetitionCount: userWord.repetitionCount,
    nextReviewDate: userWord.nextReviewDate,
  };
};