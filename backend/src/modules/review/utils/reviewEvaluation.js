const clamp = (
  value,
  min,
  max
) => {
  return Math.min(
    Math.max(value, min),
    max
  );
};

/*
================================
CALCULATE NEW MASTERY
================================
*/

const calculateMasteryScore = ({
  currentMastery,
  wasCorrect,
}) => {
  const change =
    wasCorrect ? 5 : -5;

  return clamp(
    currentMastery + change,
    0,
    100
  );
};

/*
================================
GET DIFFICULTY BUCKET
================================
*/

const getDifficultyBucket = (
  masteryScore
) => {
  if (masteryScore <= 35) {
    return "weak";
  }

  if (masteryScore <= 70) {
    return "medium";
  }

  return "strong";
};

/*
================================
EVALUATE SESSION
================================
*/

export const evaluateReviewSession = ({
  exercises,
  answers,
}) => {
  let correctCount = 0;

  const evaluationResults =
    exercises.map((exercise) => {
      const userAnswer =
        answers?.[exercise.id]
          ?.selectedAnswer;

      const wasCorrect =
        userAnswer ===
        exercise.correctAnswer;

      if (wasCorrect) {
        correctCount++;
      }

      return {
        exerciseId: exercise.id,

        userWordId:
          exercise.userWordId,

        vocabularyId:
          exercise.vocabularyId,

        exerciseType:
          exercise.type,

        selectedAnswer:
          userAnswer || null,

        correctAnswer:
          exercise.correctAnswer,

        wasCorrect,
      };
    });

  const score =
    Math.round(
      (correctCount /
        exercises.length) *
        100
    );

  return {
    score,
    evaluationResults,
  };
};

export {
  calculateMasteryScore,
  getDifficultyBucket,
};