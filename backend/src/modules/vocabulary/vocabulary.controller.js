import asyncHandler from "../../utils/asyncHandler.js";
import { getPagination } from "../../utils/pagination.js"

import { addVocabularyService, getUserVocabularyService } from "./vocabulary.service.js";
import { validateAddVocabulary } from "./vocabulary.validation.js";
import { mapUserVocabulary } from "./vocabulary.mapper.js";

export const addVocabularyController = asyncHandler(async (req, res) => {
  // Step 1: Validate input
  const validationError = validateAddVocabulary(req.body);

  if (validationError) {
    return res.status(400).json({
      success: false,
      message: validationError,
    });
  }

  // Step 2: Call service
  const userWord = await addVocabularyService(req.user.id, req.body);

  // Step 3: Response
  res.status(201).json({
    success: true,
    message: "Vocabulary added successfully",
    data: mapUserVocabulary(userWord),
  });
});

export const getUserVocabularyController = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  const { userWords, pagination } = await getUserVocabularyService(
    req.user.id,
    page,
    limit,
    skip
  );

  res.status(200).json({
    success: true,
    message: "Vocabulary fetched successfully",

    pagination,

    data: userWords.map(mapUserVocabulary),
  });
});