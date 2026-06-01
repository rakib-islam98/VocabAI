import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "../config/prisma.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { generateResetToken } from "../utils/generateResetToken.js";
import ApiError from "../utils/ApiError.js";
import { sendEmail } from "../utils/sendEmail.js";
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

export const forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Always return success even if user doesn't exist
  if (!user) {
    return;
  }

  const { resetToken, hashedToken, expiresAt } = generateResetToken();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: expiresAt,
    },
  });

  const resetUrl =
  `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset Your VocabAI Password",
    html: `
      <div
        style="
          max-width:600px;
          margin:0 auto;
          padding:40px 24px;
          font-family:Arial, Helvetica, sans-serif;
          color:#111827;
          background:#ffffff;
        "
      >
        <h1
          style="
            margin:0 0 12px;
            font-size:28px;
            font-weight:700;
          "
        >
          Reset Your Password
        </h1>

        <p
          style="
            margin:0 0 24px;
            font-size:16px;
            line-height:1.6;
            color:#4b5563;
          "
        >
          We received a request to reset the password for your
          VocabAI account.
        </p>

        <p
          style="
            margin:0 0 32px;
            font-size:16px;
            line-height:1.6;
            color:#4b5563;
          "
        >
          Click the button below to choose a new password.
        </p>

        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            padding:14px 24px;
            background:#111827;
            color:#ffffff;
            text-decoration:none;
            border-radius:10px;
            font-size:15px;
            font-weight:600;
          "
        >
          Reset Password
        </a>

        <p
          style="
            margin:32px 0 0;
            font-size:14px;
            line-height:1.6;
            color:#6b7280;
          "
        >
          This link will expire in 15 minutes.
        </p>

        <p
          style="
            margin:16px 0 0;
            font-size:14px;
            line-height:1.6;
            color:#6b7280;
          "
        >
          If you didn't request a password reset, you can safely
          ignore this email.
        </p>

        <hr
          style="
            margin:32px 0;
            border:none;
            border-top:1px solid #e5e7eb;
          "
        />

        <p
          style="
            margin:0;
            font-size:13px;
            color:#9ca3af;
          "
        >
          VocabAI • Learn vocabulary intelligently
        </p>
      </div>
    `,
  });

  return resetToken;
};

export const resetPassword = async (
  token,
  newPassword
) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new ApiError(
      400,
      "Invalid or expired reset token"
    );
  }

  const hashedPassword =
    await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });
};
