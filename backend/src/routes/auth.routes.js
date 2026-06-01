import express from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser,
    getUser, 
    refreshAccessToken, 
    forgotPasswordController, 
    resetPasswordController 
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

router.get("/me", authMiddleware, getUser);

export default router;