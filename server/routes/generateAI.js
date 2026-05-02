import express from "express";
import { generateImage } from "../controller/generateAI.js";

const router = express.Router();
router.post("/", generateImage);

export default router;