import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import ApiError from "../utils/ApiError.js";
import { verifyRefreshToken } from "../utils/verifyToken.js";

export const registerService = async ({ name, email, password }) => {
  // validation
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // existing user check
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // generate token
  const accessToken = generateAccessToken({
    id: user.id,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken({
    id: user.id,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const logoutService = async () => {
  return {
    success: true,
    message: "User logged out successfully",
  };
};

export const getUserService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const refreshAccessTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  const accessToken = generateAccessToken({
    id: decoded.id,
  });

  return {
    accessToken,
  };
};
