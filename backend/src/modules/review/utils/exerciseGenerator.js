import { generateAiExercises } from "../../ai/exercise/ai.exercise.service.js";

const SESSION_SIZE = 15;
const RANGE_WINDOW = 15;

/*
================================
SHUFFLE ARRAY: Fisher-Yates
================================
*/
const shuffleArray = (array) => {

  const shuffled = [...array];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {

    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
};

/*
================================
CALCULATE DAYS SINCE PRACTICE
================================
*/
const getDaysSincePractice = (lastPracticedAt) => {
  if (!lastPracticedAt) {
    return 30; // Default buffer for unpracticed words
  }

  const now = new Date();
  const lastDate = new Date(lastPracticedAt);
  const diffMs = now.getTime() - lastDate.getTime();

  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
};

/*
================================
CALCULATE PRIORITY SCORE
================================
*/
const calculatePriorityScore = (userWord) => {
  /*
  ================================
  WEAKNESS SCORE (Base: 0 - 50)
  ================================
  */
  let weaknessScore = 0;
  switch (userWord.difficultyBucket) {
    case "weak":
      weaknessScore = 50;
      break;
    case "medium":
      weaknessScore = 25;
      break;
    case "strong":
      weaknessScore = 5;
      break;
    default:
      weaknessScore = 10;
  }

  /*
  ================================
  RECENCY SCORE (Capped: 0 - 60)
  ================================
  FIXED: Capped at 30 days so old words don't permanently break the scale.
  ================================
  */
  const daysSincePractice = getDaysSincePractice(userWord.lastPracticedAt);
  const cappedDays = Math.min(30, daysSincePractice); 
  const recencyScore = cappedDays * 2;

  /*
  ================================
  LOW EXPOSURE BONUS (Capped: 0 - 20)
  ================================
  */
  const totalAttempts = (userWord.correctAttempts || 0) + (userWord.wrongAttempts || 0);
  const exposureScore = Math.max(0, 20 - totalAttempts);

  /*
  ================================
  RANDOMNESS BONUS (0 - 15)
  ================================
  FIXED: Increased weight so it can actually shift items within close tiers.
  ================================
  */
  const randomnessScore = Math.random() * 15;

  /*
  ================================
  FINAL SCORE (Max theoretical: ~145)
  ================================
  */
  return weaknessScore + recencyScore + exposureScore + randomnessScore;
};

/*
================================
SELECT CANDIDATE POOL
================================
*/
const buildCandidatePool = (scoredWords) => {
  if (!scoredWords.length) {
    return [];
  }

  // FIXED: If total words are fewer than the session size, return everything immediately.
  if (scoredWords.length <= SESSION_SIZE) {
    return scoredWords;
  }

  const maxScore = scoredWords[0].priorityScore;
  let range = RANGE_WINDOW;
  let candidatePool = [];
  let previousPoolLength = 0;

  while (candidatePool.length < SESSION_SIZE && range <= 150) {
    candidatePool = scoredWords.filter(
      (word) => word.priorityScore >= maxScore - range
    );

    // FIXED: Break early if expanding the score range isn't finding any new words.
    if (candidatePool.length === previousPoolLength) {
      break;
    }
    
    previousPoolLength = candidatePool.length;
    range += 15; // Increments smoothly to open the score window
  }

  // FIXED: Fallback safety net to guarantee we meet the session size if data exists.
  if (candidatePool.length < SESSION_SIZE) {
    return scoredWords.slice(0, SESSION_SIZE);
  }

  return candidatePool;
};

/*
================================
GENERATE EXERCISES
================================
*/
export const generateExercises = async (userWords) => {
  if (!userWords || !userWords.length) {
    return [];
  }

  /*
  ================================
  SCORE WORDS
  ================================
  */
  const scoredWords = userWords.map((userWord) => {
    return {
      ...userWord,
      priorityScore: calculatePriorityScore(userWord),
    };
  });

  /*
  ================================
  SORT DESCENDING
  ================================
  */
  scoredWords.sort((a, b) => b.priorityScore - a.priorityScore);

  /*
  ================================
  BUILD CANDIDATE POOL
  ================================
  */
  const candidatePool = buildCandidatePool(scoredWords);

  /*
  ================================
  RANDOM FINAL SELECTION
  ================================
  */
  const selectedWords = shuffleArray(candidatePool).slice(
    0,
    Math.min(SESSION_SIZE, candidatePool.length)
  );

  /*
  ================================
  GENERATE EXERCISES
  ================================
  */
  return await generateAiExercises({selectedWords,});
};
