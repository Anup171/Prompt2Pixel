import * as dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Prompt is required"));
    }

    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true`;

    // Just return the URL — let the browser fetch the image directly
    return res.status(200).json({ photo: url });

  } catch (error) {
    next(createError(500, error.message || "Image generation failed"));
  }
};
