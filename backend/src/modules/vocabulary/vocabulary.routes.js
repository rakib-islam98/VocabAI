import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";

import { addVocabularyController, getUserVocabularyController } from "./vocabulary.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getUserVocabularyController);
router.post("/add", authMiddleware, addVocabularyController);

export default router;