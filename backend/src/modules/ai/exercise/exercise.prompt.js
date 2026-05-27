export const buildExercisePrompt = (payload) => {
  return `
You are generating vocabulary review exercises.

Return ONLY a valid JSON object.
Structure:
{
  "exercises": []
}
No markdown.
No extra text.

RULES:
- Generate exactly one exercise per input item.
- Preserve the exact input order.
- Follow the exact "exerciseType" for each item.
- Each object must contain:
  - question
  - options
  - correctAnswer
  - explanation
- options must contain exactly 4 unique strings.
- correctAnswer must exactly match one option.
- Wrong options must be believable vocabulary words but NOT synonyms or partially-correct alternatives.
- Use realistic daily-life, academic, or professional contexts.
- Use varied contextual applications of the target word to improve practical understanding.
- Ensure only ONE option is clearly correct both grammatically and semantically.
- Do NOT use multiple forms of the same root word inside options.
- Keep explanations short and practical.

EXERCISE TYPES:
- usage_mcq:
  Ask which word best fits a realistic scenario or conversation.

- fill_blank:
  Create a realistic sentence and replace the target word with "_______".

INPUT:
${JSON.stringify(payload)}
`;
};