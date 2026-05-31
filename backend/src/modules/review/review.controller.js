import asyncHandler from "../../utils/asyncHandler.js";

import {
  getReviewStatus,
  createReviewSession,
  submitReviewSession,
  saveReviewAnswers,
} from "./review.service.js";

export const getReviewStatusController = asyncHandler(async (req, res) => {
  const status = await getReviewStatus(req.user.id);

  res.status(200).json({
    success: true,
    data: status,
  });
});

export const createReviewSessionController = asyncHandler(async (req, res) => {
  const session = await createReviewSession(req.user.id);

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
