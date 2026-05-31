import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";

import { getInsightsOverview } from "./insights.controller.js";

const router = Router();

router.get("/", authMiddleware , getInsightsOverview);

export default router;