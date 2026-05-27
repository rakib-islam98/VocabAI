import prisma from "../../config/prisma.js";

import ApiError from "../../utils/ApiError.js";

import { generateVocabularyEnrichment } from "../ai/enrichment/enrichment.service.js";

import { uploadGeneratedImage } from "./utils/uploadGeneratedImage.js";

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

  const pollinationsImageUrl = `https://image.pollinations.ai/p/${encodeURIComponent(
    visualPrompt,
  )}?seed=${encodeURIComponent(word)}&width=640&height=480&nologo=true`;

  //save image to cloudinary
  let savedImageUrl = null;

  try {
    savedImageUrl = await uploadGeneratedImage({
      imageUrl: pollinationsImageUrl,
      word,
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
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
        imageUrl: savedImageUrl || null,
        pendingImageUrl: savedImageUrl ? null : pollinationsImageUrl,
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
  await prisma.$transaction(async (tx) => {
    /*
        ========================
        VERIFY OWNERSHIP
        ========================
        */

    const existingUserWord = await tx.userWord.findFirst({
      where: {
        id: userWordId,
        userId,
      },
    });

    if (!existingUserWord) {
      throw new ApiError(404, "Vocabulary not found");
    }

    /*
        ========================
        DELETE USER WORD
        ========================
        */

    await tx.userWord.delete({
      where: {
        id: userWordId,
      },
    });

    /*
        ========================
        INVALIDATE ACTIVE SESSIONS
        ========================
        */

    await tx.reviewSession.deleteMany({
      where: {
        userId,
        status: "active",
      },
    });
  });
};

export const retryPendingVocabularyImagesService = async () => {
  const pendingVocabularies = await prisma.vocabulary.findMany({
    where: {
      pendingImageUrl: {
        not: null,
      },
    },
  });

  const results = [];

  for (const vocabulary of pendingVocabularies) {
    try {
      const savedImageUrl = await uploadGeneratedImage({
        imageUrl: vocabulary.pendingImageUrl,
        word: vocabulary.word,
      });

      await prisma.vocabulary.update({
        where: {
          id: vocabulary.id,
        },

        data: {
          imageUrl: savedImageUrl,
          pendingImageUrl: null,
        },
      });

      results.push({
        word: vocabulary.word,
        success: true,
      });
    } catch (error) {
      console.error(`Retry failed for ${vocabulary.word}:`, error.message);

      results.push({
        word: vocabulary.word,
        success: false,
        error: error.message,
      });
    }
  }

  return results;
};
