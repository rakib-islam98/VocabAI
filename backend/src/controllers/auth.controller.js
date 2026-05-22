import asyncHandler from "../utils/asyncHandler.js";
import { registerService, loginService, logoutService, getUserService } from "../services/auth.service.js";

export const registerUser = asyncHandler(async (req, res) => {

    const result = await registerService(req.body);

    res.cookie("token", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60 * 1000
    });

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result.user
    });
});

export const loginUser = asyncHandler(async (req, res) => {

    const result = await loginService(req.body);

    res.cookie("token", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60 * 1000
    });

    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: result.user
    });
});

export const logoutUser = asyncHandler(async (req, res) => {

    const result = await logoutService();

    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/"
    });

    return res.status(200).json(result);
});

export const getUser = asyncHandler(async (req, res) => {

    const user = await getUserService(req.user.id);

    return res.status(200).json({
        success: true,
        data: user
    });
});