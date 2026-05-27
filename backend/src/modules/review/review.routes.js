import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";

import { getReviewSessionController, submitReviewSessionController, saveReviewAnswersController, } from "./review.controller.js";

const router = express.Router();

router.get("/session", authMiddleware, getReviewSessionController);
router.post("/session/:id/submit", authMiddleware, submitReviewSessionController);
router.patch("/session/:id/answers", authMiddleware, saveReviewAnswersController);

export default router;
