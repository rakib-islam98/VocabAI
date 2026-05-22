import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";

import { addVocabularyController, getUserVocabularyController, deleteVocabularyController } from "./vocabulary.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getUserVocabularyController);
router.post("/add", authMiddleware, addVocabularyController);
router.delete("/:id", authMiddleware, deleteVocabularyController);

export default router;