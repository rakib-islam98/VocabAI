import prisma from "../config/prisma.js";

export const testDatabase = async() => {
    const users = await prisma.user.findMany();

    return users.length;
};

export const protectedTestService = async (user) => {

    return {
        success: true,
        message: "Protected route accessed",
        user
    };
};