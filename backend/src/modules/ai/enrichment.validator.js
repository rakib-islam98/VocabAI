import ApiError from "../../utils/ApiError.js";

export const validateEnrichmentResponse = (
    data
) => {

    const requiredFields = [
        "word",
        "hindiMeaning",
        "hinglishExplanation",
        "example",
        "imagePrompt",
    ];

    for (const field of requiredFields) {

        if (!data[field]) {

            throw new ApiError(
                500,
                `Missing AI field: ${field}`
            );
        }

        if (typeof data[field] !== "string") {

            throw new ApiError(
                500,
                `Invalid AI field type: ${field}`
            );
        }
    }

    return data;
};