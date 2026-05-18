import express from "express";
import { testController, protectedTestController, generateAITestController } from "../controllers/test.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", testController);
router.get("/protected", authMiddleware, protectedTestController);
router.get("/test-ai", generateAITestController);

export default router;