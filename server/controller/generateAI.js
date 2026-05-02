import * as dotenv from "dotenv";
import { createError } from "../error.js";
import fetch from "node-fetch"; // ✅ important for Render

dotenv.config();

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Prompt is required"));
    }

    const encodedPrompt = encodeURIComponent(prompt);

   
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true`;

    const response = await fetch(url);

    console.log("Status:", response.status); 

    if (!response.ok) {
      const text = await response.text(); 
      console.log("API Error:", text);
      throw new Error(`Image API error (${response.status})`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return res.status(200).json({
      photo: `data:image/jpeg;base64,${base64}`,
    });

  } catch (error) {
    console.log("Final error:", error); 

    next(
      createError(
        error.status || 500,
        error.message || "Image generation failed"
      )
    );
  }
};