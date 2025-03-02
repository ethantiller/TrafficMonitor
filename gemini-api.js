import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyA3w6Jrd8oUbjw4Srin5T8nywjfIsKqKTA");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function generateText(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

export { generateText };