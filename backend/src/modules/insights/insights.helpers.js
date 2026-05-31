export const calculateLearningScore = ({
  accuracy,
  averageMasteryScore,
  consistency,
}) => {
  return Math.round(
    accuracy * 0.4 +
      averageMasteryScore * 0.4 +
      consistency * 0.2
  );
};

export const buildMasteryDistribution = (userWords) => {
  const distribution = {
    weak: 0,
    learning: 0,
    strong: 0,
    mastered: 0,
  };

  for (const word of userWords) {
    const score = word.masteryScore;

    if (score < 40) {
      distribution.weak++;
    } else if (score < 60) {
      distribution.learning++;
    } else if (score < 85) {
      distribution.strong++;
    } else {
      distribution.mastered++;
    }
  }

  return distribution;
};

export const buildActivityHeatmap = (reviewAttempts) => {
  const activityMap = new Map();

  for (const attempt of reviewAttempts) {
    const date = attempt.createdAt
      .toISOString()
      .split("T")[0];

    activityMap.set(
      date,
      (activityMap.get(date) || 0) + 1
    );
  }

  return [...activityMap.entries()]
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) =>
      a.date.localeCompare(b.date)
    );
};

export const buildAccuracyTrend = (reviewAttempts) => {
  const trendMap = new Map();

  for (const attempt of reviewAttempts) {
    const date = attempt.createdAt
      .toISOString()
      .split("T")[0];

    if (!trendMap.has(date)) {
      trendMap.set(date, {
        total: 0,
        correct: 0,
      });
    }

    const day = trendMap.get(date);

    day.total += 1;

    if (attempt.wasCorrect) {
      day.correct += 1;
    }
  }

  return [...trendMap.entries()]
    .map(([date, stats]) => ({
      date,

      accuracy: Math.round(
        (stats.correct / stats.total) * 100
      ),
    }))
    .sort((a, b) =>
      a.date.localeCompare(b.date)
    );
};

export const buildVocabularyGrowth = (userWords) => {
  const growthMap = new Map();

  for (const word of userWords) {
    const date = new Date(word.createdAt);

    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    growthMap.set(
      monthKey,
      (growthMap.get(monthKey) || 0) + 1
    );
  }

  return [...growthMap.entries()]
    .map(([month, count]) => ({
      month,
      count,
    }))
    .sort((a, b) =>
      a.month.localeCompare(b.month)
    );
};

export const buildExercisePerformance = (
  reviewAttempts
) => {
  const performanceMap = new Map();

  for (const attempt of reviewAttempts) {
    const type = attempt.exerciseType;

    if (!performanceMap.has(type)) {
      performanceMap.set(type, {
        total: 0,
        correct: 0,
      });
    }

    const stats = performanceMap.get(type);

    stats.total += 1;

    if (attempt.wasCorrect) {
      stats.correct += 1;
    }
  }

  return [...performanceMap.entries()].map(
    ([type, stats]) => ({
      type,

      accuracy: Math.round(
        (stats.correct / stats.total) * 100
      ),

      attempts: stats.total,
    })
  );
};

export const buildStreaks = (reviewSessions) => {
  const reviewDays = [
    ...new Set(
      reviewSessions
        .filter((session) => session.completedAt)
        .map((session) =>
          session.completedAt
            .toISOString()
            .split("T")[0]
        )
    ),
  ].sort();

  if (reviewDays.length === 0) {
    return {
      currentStreak: 0,
      bestStreak: 0,
    };
  }

  let bestStreak = 1;
  let runningStreak = 1;

  for (let i = 1; i < reviewDays.length; i++) {
    const previous = new Date(reviewDays[i - 1]);
    const current = new Date(reviewDays[i]);

    const diffDays =
      (current - previous) /
      (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      runningStreak++;

      bestStreak = Math.max(
        bestStreak,
        runningStreak
      );
    } else {
      runningStreak = 1;
    }
  }

  let currentStreak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let cursor = new Date(today);

  while (true) {
    const dateString = cursor
      .toISOString()
      .split("T")[0];

    if (!reviewDays.includes(dateString)) {
      break;
    }

    currentStreak++;

    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    currentStreak,
    bestStreak,
  };
};