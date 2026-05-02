import * as dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

// Controller — uses Pollinations.AI (no API key needed, always free)
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Prompt is required"));
    }

    // Pollinations.AI: free, no auth, returns image directly
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&model=flux`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Image API error (${response.status}): ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const contentType = response.headers.get("content-type") || "image/jpeg";
    const mimeType = contentType.startsWith("image/") ? contentType : "image/jpeg";

    return res.status(200).json({
      photo: `data:${mimeType};base64,${base64}`,
    });

  } catch (error) {
    next(
      createError(
        error.status || 500,
        error.message || "Image generation failed"
      )
    );
  }
};