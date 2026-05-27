import asyncHandler from "../../utils/asyncHandler.js";
import { getPagination } from "../../utils/pagination.js";

import {
  addVocabularyService,
  getUserVocabularyService,
  deleteVocabularyService,
  retryPendingVocabularyImagesService,
} from "./vocabulary.service.js";
import { validateAddVocabulary } from "./vocabulary.validation.js";
import { mapUserVocabulary } from "./vocabulary.mapper.js";

import ApiError from "../../utils/ApiError.js";

export const addVocabularyController = asyncHandler(async (req, res) => {
  const validationError = validateAddVocabulary(req.body);

  if (validationError) {
    throw new ApiError(400, validationError);
  }

  const userWord = await addVocabularyService(req.user.id, req.body);

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
    skip,
  );

  res.status(200).json({
    success: true,
    message: "Vocabulary fetched successfully",

    pagination,

    data: userWords.map(mapUserVocabulary),
  });
});

export const deleteVocabularyController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const userWordId = req.params.id;

  await deleteVocabularyService(userId, userWordId);

  res.status(200).json({
    success: true,
    message: "Vocabulary deleted successfully",
  });
});

export const retryPendingVocabularyImages = async (req, res) => {
  const results = await retryPendingVocabularyImagesService();

  res.status(200).json({
    success: true,
    message: "Pending image retry completed",
    data: results,
  });
};

