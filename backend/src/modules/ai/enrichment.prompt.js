export const buildVocabularyEnrichmentPrompt = ({ word, sourceSentence }) => {
  const hasSourceSentence = sourceSentence?.trim();

  return `
You are an English vocabulary assistant for Indian learners.

Generate:
- Part of speech
- Concise and only ONE most appropriate Hindi meaning in Devanagari
- Short natural Hinglish explanation in ONE concise sentence
- One relatable natural English example sentence
- One short clear image prompt describing the same scene as the example

Part of speech must be one of:
- noun
- verb
- adjective
- adverb
- pronoun
- preposition
- conjunction
- interjection

Rules:
- Use the source sentence only to identify the correct meaning and part of speech.
- Do not copy or rewrite the source sentence.
- Keep outputs concise, practical, and beginner-friendly.
- Avoid multiple comma-separated synonyms.
- If multiple meanings exist, choose the meaning matching the source sentence.
- The Hindi meaning should preserve the actual meaning, not an oversimplified generic synonym.
- The example and image prompt must describe the SAME simple real-world scene.
- The scene should be easy to visualize and easy to generate as an image.
- Avoid abstract, metaphorical, cinematic, or hard-to-visualize situations.
- Return ONLY valid JSON.
- No markdown or extra text.

${
  hasSourceSentence
    ? `Source Sentence: "${sourceSentence.trim()}"`
    : `No source sentence provided. Use the most common practical meaning.`
}

Target Word: "${word}"

{
  "word": "${word}",
  "partOfSpeech": "",
  "hindiMeaning": "",
  "hinglishExplanation": "",
  "example": "",
  "imagePrompt": ""
}
`;
};
