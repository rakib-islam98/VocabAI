import prisma from "../../config/prisma.js";

export const addVocabularyService = async (userId, data) => {
  const { word, meaning, hinglishMeaning, exampleSentence, sourceSentence } =
    data;

  // Step 1: Check existing vocabulary
  let vocabulary = await prisma.vocabulary.findFirst({
    where: {
      word,
      meaning,
    },
  });

  // Step 2: Create if not exists
  if (!vocabulary) {
    vocabulary = await prisma.vocabulary.create({
      data: {
        word,
        meaning,
        hinglishMeaning,
        exampleSentence,
      },
    });
  }

  //check for duplicate
  const existingUserWord = await prisma.userWord.findFirst({
    where: {
      userId,
      vocabularyId: vocabulary.id,
    },
  });

  if (existingUserWord) {
    throw new ApiError(409, "Vocabulary already saved");
  }

  // Step 3: Create UserWord
  const userWord = await prisma.userWord.create({
    data: {
      userId,
      vocabularyId: vocabulary.id,
      sourceSentence,
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
