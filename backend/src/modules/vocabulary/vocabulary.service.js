import prisma from "../../config/prisma.js";

import ApiError from "../../utils/ApiError.js";

import { generateVocabularyEnrichment }
from "../ai/enrichment.service.js";

export const addVocabularyService = async (
    userId,
    data
) => {

    let {
        word,
        sourceSentence,
    } = data;

    word = word.toLowerCase().trim();

    // Generate AI enrichment

    const enrichment =
        await generateVocabularyEnrichment({
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

    // Check existing contextual vocabulary

    let vocabulary =
        await prisma.vocabulary.findFirst({
            where: {
                word,
                partOfSpeech,
                hindiMeaning,
            },
        });

    // Create vocabulary if not exists

    if (!vocabulary) {

        vocabulary =
            await prisma.vocabulary.create({
                data: {
                    word,
                    partOfSpeech,
                    hindiMeaning,
                    hinglishExplanation,
                    example,
                    imagePrompt,
                },
            });
    }

    // Prevent duplicate save for same user

    const existingUserWord =
        await prisma.userWord.findFirst({
            where: {
                userId,
                vocabularyId: vocabulary.id,
            },
        });

    if (existingUserWord) {

        throw new ApiError(
            409,
            "Vocabulary already saved"
        );
    }

    // Create UserWord

    const userWord =
        await prisma.userWord.create({
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

export const getUserVocabularyService = async (
    userId,
    page,
    limit,
    skip
) => {

    const [userWords, total] =
        await Promise.all([

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
            totalPages:
                Math.ceil(total / limit),
        },
    };
};