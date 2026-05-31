import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";

import {
  getReviewStatusController,
  createReviewSessionController,
  submitReviewSessionController,
  saveReviewAnswersController,
} from "./review.controller.js";

const router = express.Router();

router.get("/status", authMiddleware, getReviewStatusController);

router.post("/session", authMiddleware, createReviewSessionController);

router.post("/session/:id/submit", authMiddleware, submitReviewSessionController);

router.patch("/session/:id/answers", authMiddleware, saveReviewAnswersController);

export default router;
