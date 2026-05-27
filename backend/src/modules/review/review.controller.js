import asyncHandler from "../../utils/asyncHandler.js";

import {
  getOrCreateReviewSession,
  submitReviewSession,
  saveReviewAnswers,
} from "./review.service.js";

export const getReviewSessionController = asyncHandler(async (req, res) => {
  const session = await getOrCreateReviewSession(req.user.id);

  res.status(200).json({
    success: true,
    data: session,
  });
});

export const submitReviewSessionController = asyncHandler(async (req, res) => {
  const session = await submitReviewSession(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: "Review session submitted successfully",
    data: session,
  });
});

export const saveReviewAnswersController = asyncHandler(async (req, res) => {
  const session = await saveReviewAnswers({
    sessionId: req.params.id,

    userId: req.user.id,

    answers: req.body.answers,
  });

  res.status(200).json({
    success: true,
    message: "Review answers saved successfully",
    data: session,
  });
});
