import OpenAI from "openai";

const ai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const cleanJson = (text) => {
  if (!text) return "";

  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

export const generateAIContent = async ({
  prompt,
  systemInstruction = "",
  model = process.env.AI_MODEL,
  temperature = 0.2,
  jsonMode = false,
}) => {
  try {
    const response = await ai.chat.completions.create({
      model,
      temperature,

      messages: [
        ...(systemInstruction
          ? [{ role: "system", content: systemInstruction }]
          : []),

        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const choice = response?.choices?.[0];

    if (!choice?.message?.content) {
      throw new Error("AI provider returned empty response");
    }

    let content = choice.message.content.trim();

    if (!jsonMode) {
      return content;
    }

    return cleanJson(content);
  } catch (error) {
    console.error("AI Provider Error:", error);

    throw error;
  }
};
