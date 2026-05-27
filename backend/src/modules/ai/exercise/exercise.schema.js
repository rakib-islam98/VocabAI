export const createExercise = ({
  id,

  type,

  userWordId,

  vocabularyId,

  word,

  question,

  options,

  correctAnswer,

  explanation,

  metadata = {},
}) => {
  return {
    id,

    type,

    userWordId,

    vocabularyId,

    word,

    question,

    options,

    correctAnswer,

    explanation,

    metadata: {
      generatedBy:
        metadata.generatedBy || "fallback",

      fallbackUsed:
        metadata.fallbackUsed || false,
    },
  };
};