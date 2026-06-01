import asyncHandler from "../utils/asyncHandler.js";
import {
  registerService,
  loginService,
  logoutService,
  getUserService,
  refreshAccessTokenService,
  forgotPassword,
  resetPassword,
} from "../services/auth.service.js";

export const registerUser = asyncHandler(async (req, res) => {
  const result = await registerService(req.body);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result.user,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const result = await loginService(req.body);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: result.user,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  const result = await logoutService();

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
  });

  return res.status(200).json(result);
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await getUserService(req.user.id);

  return res.status(200).json({
    success: true,
    data: user,
  });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  try {
    const result = await refreshAccessTokenService(refreshToken);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
    });
  } catch (error) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });

    throw error;
  }
});

export const forgotPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await forgotPassword(email);

  res.status(200).json({
    success: true,
    message:
      "If an account exists with that email, a password reset link has been sent.",
  });
});

export const resetPasswordController = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  await resetPassword(token, password);

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});
