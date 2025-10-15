// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import * as fs from "fs";
import path from "path";
import mammoth from "mammoth";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_NAME = "models/gemini-2.5-flash-preview-05-20";

// Configure file uploads
const upload = multer({ dest: "uploads/" });

// ✅ FILE UPLOAD SUMMARIZATION
app.post("/api/summarize-file", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    let text = "";

    // Extract text based on file type
    if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      text = pdfData.text;
    } else if (ext === ".docx" || ext === ".doc") {
      const doc = await mammoth.extractRawText({ path: filePath });
      text = doc.value;
    } else if (ext === ".txt") {
      text = fs.readFileSync(filePath, "utf8");
    } else {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: "Unsupported file type." });
    }

    fs.unlinkSync(filePath); // clean up temp upload

    // Trim overly long text to avoid token overflow
    if (text.length > 20000) {
      text = text.substring(0, 20000);
    }

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `Summarize this document in clear, concise English suitable for quick reading:\n\n${text}`;
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    res.json({ summary });
  } catch (error) {
    console.error("❌ File Summary Error:", error);
    res.status(500).json({ error: "Failed to summarize file." });
  }
});

// ✅ TEXT SUMMARIZATION (online)
app.post("/api/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    console.log("🟢 Incoming text:", text?.slice(0, 100) + "...");

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "No text provided." });
    }

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `Summarize this text clearly, briefly, and accurately:\n\n${text}`;
    const result = await model.generateContent(prompt);

    const summary = result.response.text();
    console.log("🟣 Gemini Summary:", summary?.slice(0, 100) + "...");

    res.json({ summary });
  } catch (error) {
    console.error("❌ Gemini Error:", error);
    res.status(500).json({ error: "Failed to summarize text." });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
