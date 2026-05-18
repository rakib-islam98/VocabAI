export const validateAddVocabulary = (data) => {

    const {
        word,
        sourceSentence,
    } = data;

    if (!word?.trim()) {
        return "Word is required";
    }

    if (
        sourceSentence &&
        typeof sourceSentence !== "string"
    ) {
        return "Source sentence must be a string";
    }

    return null;
};