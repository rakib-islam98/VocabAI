import prisma from "../../config/prisma.js";

import { getStartOfToday } from "../../utils/date.js";

import { generateExercises } from "../review/utils/exerciseGenerator.js";

import {
  evaluateReviewSession,
  calculateMasteryScore,
  getDifficultyBucket,
} from "./utils/reviewEvaluation.js";

import ApiError from "../../utils/ApiError.js";

import { mapReviewSession } from "./review.mapper.js";

export const getOrCreateReviewSession = async (userId) => {
  /*
    =================================
    STEP 1:
    RESUME ACTIVE SESSION
    =================================
    */

  const activeSession = await prisma.reviewSession.findFirst({
    where: {
      userId,
      status: "active",
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  if (activeSession) {
    return {
      type: "active",
      session: mapReviewSession(activeSession),
    };
  }

  /*
    =================================
    STEP 2:
    CHECK COMPLETED TODAY
    =================================
    */

  const startOfToday = getStartOfToday();

  const completedSession = await prisma.reviewSession.findFirst({
    where: {
      userId,

      status: "completed",

      completedAt: {
        gte: startOfToday,
      },
    },
  });

  if (completedSession) {
    return {
      type: "completed_today",
      message: "Today's review session already completed.",
    };
  }

  /*
  =================================
  STEP 3:
  GENERATE EXERCISE SESSION
  =================================
  */

  const MINIMUM_REVIEW_WORDS = 10;

  /*
================================
FETCH USER WORDS
================================
*/

  const userWords = await prisma.userWord.findMany({
    where: {
      userId,
    },

    include: {
      vocabulary: true,
    },
  });

  /*
================================
EMPTY STATE
================================
*/

  if (!userWords.length) {
    return {
      type: "empty",

      message: "Add vocabulary words to start practicing.",
    };
  }

  /*
================================
MINIMUM WORD REQUIREMENT
================================
*/

  if (userWords.length < MINIMUM_REVIEW_WORDS) {
    return {
      type: "insufficient_words",

      message: `Add at least ${MINIMUM_REVIEW_WORDS} vocabulary words to unlock practice sessions.`,
    };
  }

  /*
================================
GENERATE EXERCISES
================================
*/

  const exercises = await generateExercises(userWords);

  /*
================================
CREATE SESSION
================================
*/

  const newSession = await prisma.reviewSession.create({
    data: {
      userId,

      totalExercises: exercises.length,

      exercises,

      startedAt: new Date(),
    },
  });

  return {
    type: "new",
    session: mapReviewSession(newSession),
  };
};

export const submitReviewSession = async (sessionId, userId) => {
  /*
    ================================
    FIND SESSION
    ================================
    */

  const session = await prisma.reviewSession.findFirst({
    where: {
      id: sessionId,
      userId,
    },
  });

  if (!session) {
    throw new ApiError(404, "Review session not found");
  }

  /*
    ================================
    VALIDATE ACTIVE STATUS
    ================================
    */

  if (session.status !== "active") {
    throw new ApiError(400, "Review session already completed");
  }

  /*
    ================================
    VALIDATE ANSWERS EXIST
    ================================
    */

  if (!session.answers) {
    throw new ApiError(400, "No answers submitted");
  }

  /*
    ================================
    EVALUATE SESSION
    ================================
    */

  const { score, evaluationResults } = evaluateReviewSession({
    exercises: session.exercises,

    answers: session.answers,
  });

  /*
    ================================
    TRANSACTION
    ================================
    */

  const completedSession = await prisma.$transaction(async (tx) => {
    /*
          ============================
          UPDATE SESSION
          ============================
          */

    const updatedSession = await tx.reviewSession.update({
      where: {
        id: session.id,
      },

      data: {
        status: "completed",

        score,

        submittedAt: new Date(),

        completedAt: new Date(),
      },
    });

    /*
          ============================
          PROCESS EACH RESULT
          ============================
          */

    for (const result of evaluationResults) {
      const userWord = await tx.userWord.findUnique({
        where: {
          id: result.userWordId,
        },
      });

      if (!userWord) {
        continue;
      }

      /*
            ==========================
            NEW MASTERY
            ==========================
            */

      const newMasteryScore = calculateMasteryScore({
        currentMastery: userWord.masteryScore,

        wasCorrect: result.wasCorrect,
      });

      /*
            ==========================
            NEW BUCKET
            ==========================
            */

      const newBucket = getDifficultyBucket(newMasteryScore);

      /*
            ==========================
            UPDATE USER WORD
            ==========================
            */

      await tx.userWord.update({
        where: {
          id: userWord.id,
        },

        data: {
          masteryScore: newMasteryScore,

          difficultyBucket: newBucket,

          lastPracticedAt: new Date(),

          correctAttempts: result.wasCorrect
            ? {
                increment: 1,
              }
            : undefined,

          wrongAttempts: !result.wasCorrect
            ? {
                increment: 1,
              }
            : undefined,
        },
      });

      /*
            ==========================
            CREATE REVIEW ATTEMPT
            ==========================
            */

      await tx.reviewAttempt.create({
        data: {
          userId,

          reviewSessionId: session.id,

          userWordId: userWord.id,

          exerciseType: result.exerciseType,

          selectedAnswer: result.selectedAnswer,

          correctAnswer: result.correctAnswer,

          wasCorrect: result.wasCorrect,
        },
      });
    }

    return updatedSession;
  });

  return completedSession;
};

export const saveReviewAnswers = async ({ sessionId, userId, answers }) => {
  /*
    ================================
    FIND SESSION
    ================================
    */

  const session = await prisma.reviewSession.findFirst({
    where: {
      id: sessionId,
      userId,
    },
  });

  if (!session) {
    throw new ApiError(404, "Review session not found");
  }

  /*
    ================================
    VALIDATE ACTIVE STATUS
    ================================
    */

  if (session.status !== "active") {
    throw new ApiError(400, "Cannot update completed session");
  }

  /*
    ================================
    SAVE ANSWERS
    ================================
    */

  const updatedSession = await prisma.reviewSession.update({
    where: {
      id: session.id,
    },

    data: {
      answers,
    },
  });

  return updatedSession;
};
