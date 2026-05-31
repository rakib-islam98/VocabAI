import { evaluateReviewSession } from "./reviewEvaluation.js";

/*
================================
BUILD REVIEW RESULTS
================================
*/

export const buildReviewResults = ({
  exercises,
  answers,
}) => {
  /*
  ================================
  EVALUATE SESSION
  ================================
  */

  const {
    score,
    evaluationResults,
  } = evaluateReviewSession({
    exercises,
    answers,
  });

  /*
  ================================
  COUNTS
  ================================
  */

  const correctCount =
    evaluationResults.filter(
      (result) => result.wasCorrect
    ).length;

  const skippedCount =
    evaluationResults.filter(
      (result) => result.wasSkipped
    ).length;

  const wrongCount =
    evaluationResults.filter(
      (result) =>
        !result.wasCorrect &&
        !result.wasSkipped
    ).length;

  /*
  ================================
  BUILD RESULT ITEMS
  ================================
  */

  const results = exercises.map(
    (exercise) => {
      const evaluation =
        evaluationResults.find(
          (result) =>
            result.exerciseId ===
            exercise.id
        );

      return {
        exerciseId: exercise.id,

        word: exercise.word,

        question:
          exercise.question,

        explanation:
          exercise.explanation,

        options:
          exercise.options,

        exerciseType:
          exercise.type,

        selectedAnswer:
          evaluation.selectedAnswer,

        correctAnswer:
          evaluation.correctAnswer,

        wasCorrect:
          evaluation.wasCorrect,

        wasSkipped:
          evaluation.wasSkipped,
      };
    }
  );

  /*
  ================================
  FINAL REPORT
  ================================
  */

  return {
    score,

    totalQuestions:
      exercises.length,

    correctCount,

    wrongCount,

    skippedCount,

    results,
  };
};