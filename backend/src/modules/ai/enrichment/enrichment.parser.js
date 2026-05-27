import ApiError from "../../../utils/ApiError.js";

export const parseEnrichmentResponse = (
    rawResponse
) => {

    try {

        const cleanedResponse = rawResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleanedResponse);

    } catch {

        throw new ApiError(
            500,
            "Invalid AI response format"
        );
    }
};