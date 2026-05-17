// Create Prisma Client Singleton
// User 1 ──┐
// User 2 ──┼─► [ Express Server ] ──► [ Prisma Singleton Client ] ──► [ 10 Shared Lanes ] ──► [ PostgreSQL ]
// User 3 ──┘

import {PrismaClient} from "../generated/prisma/index.js"

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

export default prisma;