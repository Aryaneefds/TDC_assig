// testGemini.ts

import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";



const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Say hello"
  });

  console.log(response.text);
}

main();