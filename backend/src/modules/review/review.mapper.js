const sanitizeExercise = (
  exercise
) => {
  return {
    id: exercise.id,

    type: exercise.type,

    userWordId:
      exercise.userWordId,

    vocabularyId:
      exercise.vocabularyId,

    word: exercise.word,

    question:
      exercise.question,

    options:
      exercise.options,
  };
};

export const mapReviewSession = (
  session
) => {
  return {
    ...session,

    exercises:
      session.exercises.map(
        sanitizeExercise
      ),
  };
};