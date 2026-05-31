import prisma from "../config/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/verifyToken.js"

const authMiddleware = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.accessToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized access");
    }

    const decoded = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    req.user = user;

    next();
});

export default authMiddleware;