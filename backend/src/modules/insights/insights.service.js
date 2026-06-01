import prisma from "../../config/prisma.js";

import {
  buildActivityHeatmap,
  buildAccuracyTrend,
  buildExercisePerformance,
  buildMasteryDistribution,
  buildStreaks,
  buildVocabularyGrowth,
  calculateLearningScore,
} from "./insights.helpers.js";

export const getInsightsService = async (userId) => {
  const [userWords, reviewAttempts, reviewSessions] =
    await prisma.$transaction([
      prisma.userWord.findMany({
        where: {
          userId,
        },

        select: {
          id: true,

          masteryScore: true,

          correctAttempts: true,

          wrongAttempts: true,

          createdAt: true,

          updatedAt: true,

          vocabulary: {
            select: {
              word: true,
            },
          },
        },
      }),

      prisma.reviewAttempt.findMany({
        where: {
          userId,
        },

        select: {
          exerciseType: true,

          wasCorrect: true,

          createdAt: true,
        },
      }),

      prisma.reviewSession.findMany({
        where: {
          userId,

          status: "completed",
        },

        select: {
          completedAt: true,
        },
      }),
    ]);

  const totalWords = userWords.length;

  const strongWords = userWords.filter(
    (word) => word.masteryScore >= 60
  ).length;

  const masteredWords = userWords.filter(
    (word) => word.masteryScore >= 85
  ).length;

  const averageMasteryScore =
    totalWords === 0
      ? 0
      : Math.round(
          userWords.reduce(
            (sum, word) => sum + word.masteryScore,
            0
          ) / totalWords
        );

  const totalAttempts = reviewAttempts.length;

  const correctAttempts = reviewAttempts.filter(
    (attempt) => attempt.wasCorrect
  ).length;

  const accuracy =
    totalAttempts === 0
      ? 0
      : Math.round(
          (correctAttempts / totalAttempts) * 100
        );

  const reviewsCompleted = reviewSessions.length;

  const masteryDistribution =
    buildMasteryDistribution(userWords);

  const {
    currentStreak,
    bestStreak,
  } = buildStreaks(reviewSessions);

  const heatmap =
    buildActivityHeatmap(
      reviewAttempts,
      userWords
    );

  const activeDays = heatmap.length;

  const goalDays = heatmap.filter(
    (day) => day.count >= 15
  ).length;

  const consistency =
    activeDays === 0
      ? 0
      : Math.min(
          100,
          Math.round((activeDays / 30) * 100)
        );

  const learningScore = calculateLearningScore({
    accuracy,
    averageMasteryScore,
    consistency,
  });

  const accuracyTrend =
    buildAccuracyTrend(reviewAttempts);

  const vocabularyGrowth =
    buildVocabularyGrowth(userWords);

  const exercisePerformance =
    buildExercisePerformance(reviewAttempts);

  const weakestWords = [...userWords]
    .sort(
      (a, b) =>
        a.masteryScore - b.masteryScore
    )
    .slice(0, 10)
    .map((word) => ({
      id: word.id, // UserWord ID
      word: word.vocabulary.word,
      masteryScore: Math.round(word.masteryScore),
      wrongAttempts: word.wrongAttempts,
    }));

  const recentlyMasteredWords = userWords
    .filter(
      (word) => word.masteryScore >= 85
    )
    .sort(
      (a, b) =>
        b.updatedAt.getTime() -
        a.updatedAt.getTime()
    )
    .slice(0, 10)
    .map((word) => ({
      word: word.vocabulary.word,

      masteryScore: Math.round(
        word.masteryScore
      ),
    }));

  return {
    hero: {
      learningScore,

      accuracy,

      totalWords,

      strongWords,

      masteredWords,

      currentStreak,

      bestStreak,

      reviewsCompleted,

      averageMasteryScore,
    },

    activity: {
      activeDays,

      goalDays,

      currentStreak,

      bestStreak,
      
      heatmap,
    },

    masteryDistribution,

    accuracyTrend,

    vocabularyGrowth,

    weakestWords,

    exercisePerformance,

    recentlyMasteredWords,
  };
};