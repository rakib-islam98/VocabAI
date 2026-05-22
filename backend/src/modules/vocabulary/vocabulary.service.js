import prisma from "../../config/prisma.js";

import ApiError from "../../utils/ApiError.js";

import { generateVocabularyEnrichment } from "../ai/enrichment.service.js";

export const addVocabularyService = async (userId, data) => {
  let { word, sourceSentence } = data;

  word = word.toLowerCase().trim();

  // Generate AI enrichment

  const enrichment = await generateVocabularyEnrichment({
    word,
    sourceSentence,
  });

  const {
    partOfSpeech,
    hindiMeaning,
    hinglishExplanation,
    example,
    imagePrompt,
  } = enrichment;
  //Ai image url generation
  const cleanedImagePrompt = imagePrompt
    .replace(/["']/g, "")
    .replace(/\./g, "")
    .trim()
    .slice(0, 120);

  const visualPrompt = `flat vector illustration educational app style ${cleanedImagePrompt}`;

  const imageUrl = `https://image.pollinations.ai/p/${encodeURIComponent(
    visualPrompt,
  )}?seed=${encodeURIComponent(word)}&width=640&height=480&nologo=true`;

  //image warm up
  try {
    await Promise.race([
      fetch(imageUrl),

      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Image warmup timeout")), 5000),
      ),
    ]);
  } catch (error) {
    console.error("Image warmup failed:", error.message);
  }

  // Check existing contextual vocabulary

  let vocabulary = await prisma.vocabulary.findFirst({
    where: {
      word,
      partOfSpeech,
      hindiMeaning,
    },
  });

  // Create vocabulary if not exists

  if (!vocabulary) {
    vocabulary = await prisma.vocabulary.create({
      data: {
        word,
        partOfSpeech,
        hindiMeaning,
        hinglishExplanation,
        example,
        imagePrompt,
        imageUrl,
      },
    });
  }

  // Prevent duplicate save for same user

  const existingUserWord = await prisma.userWord.findFirst({
    where: {
      userId,
      vocabularyId: vocabulary.id,
    },
  });

  if (existingUserWord) {
    throw new ApiError(409, "Vocabulary already saved");
  }

  // Create UserWord

  const userWord = await prisma.userWord.create({
    data: {
      userId,
      vocabularyId: vocabulary.id,
      sourceSentence,
    },

    include: {
      vocabulary: true,
    },
  });

  return userWord;
};

export const getUserVocabularyService = async (userId, page, limit, skip) => {
  const [userWords, total] = await Promise.all([
    prisma.userWord.findMany({
      where: {
        userId,
      },

      include: {
        vocabulary: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: limit,
    }),

    prisma.userWord.count({
      where: {
        userId,
      },
    }),
  ]);

  return {
    userWords,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const deleteVocabularyService = async (userId, userWordId) => {
  const existingUserWord = await prisma.userWord.findFirst({
    where: {
      id: userWordId,
      userId,
    },
  });

  if (!existingUserWord) {
    throw new ApiError(404, "Vocabulary not found");
  }

  await prisma.userWord.delete({
    where: {
      id: userWordId,
    },
  });
};
