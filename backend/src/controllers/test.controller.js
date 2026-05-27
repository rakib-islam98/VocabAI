import { testDatabase, protectedTestService } from "../services/test.service.js";
import asyncHandler from "../utils/asyncHandler.js";

import { generateVocabularyEnrichment } from "../modules/ai/enrichment/enrichment.service.js";

const testController = asyncHandler(async(req, res)=>{
    const users = await testDatabase();

    res.status(200).json({
        success: true,
        userCount: users
    });
});

const protectedTestController = asyncHandler(
    async (req, res) => {

        const result = await protectedTestService(req.user);

        return res.status(200).json(result);
    }
);

export {
    testController, protectedTestController,
}