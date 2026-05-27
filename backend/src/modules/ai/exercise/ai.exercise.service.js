import crypto from "crypto";

import { createExercise } from "./exercise.schema.js";

import { ExerciseTypes } from "./exercise.types.js";

import { validateExercise } from "./exercise.validation.js";

import { generateReverseMeaningExercise } from "./reverseMeaning.generator.js";

import ApiError from "../../../utils/ApiError.js";

import { generateAIContent } from "../provider/ai.provider.js";

import { buildExercisePrompt } from "./exercise.prompt.js";

/*
================================
RANDOM EXERCISE TYPE
================================
*/

const EXERCISE_TYPES = [ExerciseTypes.USAGE_MCQ, ExerciseTypes.FILL_BLANK];

const getRandomExerciseType = (previousType = null) => {
  const availableTypes = EXERCISE_TYPES.filter((type) => type !== previousType);

  return availableTypes[Math.floor(Math.random() * availableTypes.length)];
};

/*
================================
BUILD AI PAYLOAD
================================
*/

const buildExercisePayload = (selectedWords) => {
  let previousType = null;

  return selectedWords.map((userWord) => {
    const exerciseType =
      EXERCISE_TYPES[Math.floor(Math.random() * EXERCISE_TYPES.length)]; // getRandomExerciseType(previousType);

    //previousType = exerciseType;

    return {
      userWordId: userWord.id,

      vocabularyId: userWord.vocabulary.id,

      word: userWord.vocabulary.word,

      hinglishExplanation: userWord.vocabulary.hinglishExplanation,

      example: userWord.vocabulary.example,

      exerciseType,
    };
  });
};

/*
================================
GENERATE AI EXERCISES
================================
*/

export const generateAiExercises = async ({ selectedWords }) => {
  /*
    ================================
    BUILD PAYLOAD
    ================================
    */

  const payload = buildExercisePayload(selectedWords);

  /*
    ================================
    BUILD PROMPT
    ================================
    */

  const prompt = buildExercisePrompt(payload);

  /*
    ================================
    Ai RESPONSE
    ================================
    */

  let aiResponse;

  try {
    /*
  ================================
  GENERATE AI CONTENT
  ================================
  */

    const rawText = await generateAIContent({
      prompt,

      temperature: 0.3,

      jsonMode: true,

      systemInstruction: `
You are a vocabulary exercise generator.

Generate realistic, practical, and contextually accurate exercises.

Prioritize clarity, correctness, and educational usefulness over creativity.

Return only valid JSON.
`,
    });

    /*
  ================================
  PARSE JSON
  ================================
  */

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(rawText);
    } catch (error) {
      throw new Error("Failed to parse AI JSON response");
    }

    aiResponse = Array.isArray(parsedResponse)
      ? parsedResponse
      : parsedResponse.exercises;
    /*
  ================================
  VALIDATE RESPONSE SHAPE
  ================================
  */

    if (!Array.isArray(aiResponse)) {
      throw new Error("AI response is not array");
    }

    if (aiResponse.length !== payload.length) {
      throw new Error("Exercise count mismatch.");
    }
  } catch (error) {
    console.error("AI Exercise Generation Error:", error);

    throw new ApiError(
      503,
      "AI review generation service is currently busy. Please try again.",
    );
  }

  /*
    ================================
    FINAL EXERCISES
    ================================
    */

  const finalExercises = [];

  for (let i = 0; i < payload.length; i++) {
    const original = payload[i];

    const generated = aiResponse[i];

    /*
      ==============================
      VALID AI EXERCISE
      ==============================
      */

    if (generated && validateExercise(generated)) {
      finalExercises.push(
        createExercise({
          id: crypto.randomUUID(),

          type: original.exerciseType,

          userWordId: original.userWordId,

          vocabularyId: original.vocabularyId,

          word: original.word,

          question: generated.question,

          options: generated.options,

          correctAnswer: generated.correctAnswer,

          explanation: generated.explanation,

          metadata: {
            generatedBy: "ai",

            fallbackUsed: false,
          },
        }),
      );
    } else {
      /*
      ==============================
      FALLBACK
      ==============================
      */
      const fallbackExercise = generateReverseMeaningExercise({
        userWord: selectedWords[i],

        allUserWords: selectedWords,
      });

      finalExercises.push(fallbackExercise);
    }
  }

  return finalExercises;
};
