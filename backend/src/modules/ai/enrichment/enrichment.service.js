import { buildVocabularyEnrichmentPrompt } from "./enrichment.prompt.js";

import { generateAIContent } from "../provider/ai.provider.js";

import { parseEnrichmentResponse } from "./enrichment.parser.js";

import { validateEnrichmentResponse } from "./enrichment.validator.js";

export const generateVocabularyEnrichment = async ({
  word,
  sourceSentence,
}) => {
  const prompt = buildVocabularyEnrichmentPrompt({
    word,
    sourceSentence,
  });

  const rawResponse = await generateAIContent({
  prompt,

  temperature: 0.2,
});

  const parsedResponse = parseEnrichmentResponse(rawResponse);

  const validatedResponse = validateEnrichmentResponse(parsedResponse);

  return validatedResponse;
};
