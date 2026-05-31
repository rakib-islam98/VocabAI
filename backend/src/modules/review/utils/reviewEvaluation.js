const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/*
================================
CALCULATE NEW MASTERY
================================
*/

const calculateMasteryScore = ({ currentMastery, wasCorrect }) => {
  let change = 0;

  if (wasCorrect) {
    if (currentMastery < 40) {
      change = 8;
    } else if (currentMastery < 80) {
      change = 5;
    } else {
      change = 2;
    }
  } else {
    if (currentMastery < 40) {
      change = -4;
    } else if (currentMastery < 80) {
      change = -6;
    } else {
      change = -10;
    }
  }

  return clamp(currentMastery + change, 0, 100);
};

/*
================================
GET DIFFICULTY BUCKET
================================
*/

const getDifficultyBucket = (masteryScore) => {
  if (masteryScore < 40) {
    return "weak";
  }

  if (masteryScore < 80) {
    return "medium";
  }

  return "strong";
};

/*
================================
EVALUATE SESSION
================================
*/

export const evaluateReviewSession = ({ exercises, answers }) => {
  let correctCount = 0;

  const evaluationResults = exercises.map((exercise) => {
    const userAnswer = answers?.[exercise.id]?.selectedAnswer;

    const wasSkipped = (userAnswer == null);

    const wasCorrect = !wasSkipped && (userAnswer === exercise.correctAnswer);

    if (wasCorrect) {
      correctCount++;
    }

    return {
      exerciseId: exercise.id,

      userWordId: exercise.userWordId,

      vocabularyId: exercise.vocabularyId,

      exerciseType: exercise.type,

      selectedAnswer: userAnswer ?? null,

      correctAnswer: exercise.correctAnswer,

      wasCorrect,
      
      wasSkipped,
    };
  });

  const score = Math.round((correctCount / exercises.length) * 100);

  return {
    score,
    evaluationResults,
  };
};

export { calculateMasteryScore, getDifficultyBucket };
