import crypto from "crypto";

import { createExercise } from "./exercise.schema.js";

import { ExerciseTypes } from "./exercise.types.js";

/*
================================
SHUFFLE ARRAY
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

export const generateReverseMeaningExercise = ({
  userWord,

  allUserWords,
}) => {
  /*
  =================================
  RANDOM DISTRACTORS
  =================================
  */

  const distractors = shuffleArray(
    allUserWords.filter(
      (word) =>
        word.id !== userWord.id
    )
  )
    .slice(0, 3)
    .map(
      (word) => word.vocabulary.word
    );

  /*
  =================================
  OPTIONS
  =================================
  */

  const correctAnswer =
    userWord.vocabulary.word;

  const options = shuffleArray([
    correctAnswer,
    ...distractors,
  ]);

  return createExercise({
    id: crypto.randomUUID(),

    type:
      ExerciseTypes.REVERSE_MEANING,

    userWordId: userWord.id,

    vocabularyId:
      userWord.vocabulary.id,

    word: correctAnswer,

    question: `Kaunsa word ka matlab hai: ${userWord.vocabulary.hinglishExplanation}?`,

    options,

    correctAnswer,

    explanation:
      `${correctAnswer} ka matlab hota hai ${userWord.vocabulary.hinglishExplanation}.`,

    metadata: {
      generatedBy: "fallback",

      fallbackUsed: true,
    },
  });
};