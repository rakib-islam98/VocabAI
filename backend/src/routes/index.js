import express from "express";

import healthRoutes from "./health.routes.js";
import testRoutes from "./test.routes.js";
import authRoutes from "./auth.routes.js";

import vocabularyRoutes from "../modules/vocabulary/vocabulary.routes.js"
import reviewRoutes from "../modules/review/review.routes.js"

const router = express.Router();

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

router.use("/health", healthRoutes);
router.use("/test", testRoutes);
router.use("/auth", authRoutes);
router.use("/vocabulary", vocabularyRoutes);
router.use("/review", reviewRoutes);

export default router;