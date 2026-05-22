export const mapUserVocabulary = (
    userWord
) => {

    return {

        id: userWord.id,

        word:
            userWord.vocabulary.word,

        partOfSpeech:
            userWord.vocabulary.partOfSpeech,

        hindiMeaning:
            userWord.vocabulary.hindiMeaning,

        hinglishExplanation:
            userWord.vocabulary
                .hinglishExplanation,

        example:
            userWord.vocabulary.example,

        imagePrompt:
            userWord.vocabulary.imagePrompt,

        imageUrl:
            userWord.vocabulary.imageUrl,

        sourceSentence:
            userWord.sourceSentence,

        easeFactor:
            userWord.easeFactor,

        repetitionCount:
            userWord.repetitionCount,

        nextReviewDate:
            userWord.nextReviewDate,
    };
};