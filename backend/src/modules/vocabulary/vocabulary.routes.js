import express from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";

import { addVocabularyController, 
    getUserVocabularyController, 
    deleteVocabularyController, 
    retryPendingVocabularyImages,
    getVocabularyByIdController, 
} from "./vocabulary.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getUserVocabularyController);
router.post("/add", authMiddleware, addVocabularyController);
router.get("/:id", authMiddleware, getVocabularyByIdController);
router.delete("/:id", authMiddleware, deleteVocabularyController);
router.post("/retry-pending-images", adminMiddleware, retryPendingVocabularyImages);

export default router;